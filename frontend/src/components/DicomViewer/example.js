// your-script.js
const QueryDicomImage = (idSeries, position) => {
    return axios({
        url: 'http://localhost:5001/api/dicom',
        method: 'GET',
        responseType: 'application/json', // important
        headers: {
            idSeries: idSeries,
            position: position,
        },
        // onDownloadProgress: event => handleProgress(event),
    });
};

const idSeries = '1';
const position = '10';

QueryDicomImage(idSeries, position)
    .then(response => {
        // Handle the response data here
        const parsedData = JSON.parse(response.data);
        console.log(parsedData.pixelData);    
        input = parsedData;

        const arr = input.pixelData.map(row =>
            row.map(value => Math.round((value / 376) * 255))
        );
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');

        // Assuming you already have the 'arr' array with pixel values
        const width = arr[0].length;
        const height = arr.length;

        // Create an ImageData object from the pixel data
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        // Flatten the 2D array into a 1D array (RGBA format)
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const value = arr[y][x]; // Assuming grayscale values (0-255)

                // Set R, G, B, and A channels
                data[index] = value; // Red
                data[index + 1] = value; // Green
                data[index + 2] = value; // Blue
                data[index + 3] = 255; // Alpha (opaque)
            }
        }

        // Put the image data onto the canvas
        ctx.putImageData(imageData, 0, 0);


    })
    .catch(error => {
        console.error('Error:', error);
    });
