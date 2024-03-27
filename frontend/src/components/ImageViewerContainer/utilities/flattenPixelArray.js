export const flattenPixelArray = (slice) => {
  // Calculate the total number of pixels in the image
  const numPixels = slice.width * slice.height;

  // Create a new Float32Array to store pixel values
  const flattenedPixelArray = new Float32Array(numPixels);

  // Initialize an index variable for populating the flattenedPixelArray
  let i = 0;

  // Iterate through each row of pixel data
  slice.pixelData.forEach((row) => {
    // For each pixel in the row, assign its value to the corresponding position in pixarray
    row.forEach((pixel) => {
      flattenedPixelArray[i] = pixel;
      i++;
    });
  });
  return flattenedPixelArray;
};
