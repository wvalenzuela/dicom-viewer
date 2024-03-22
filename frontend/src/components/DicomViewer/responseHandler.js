const data = require("./exampleResponse.json")

const arr = data.pixelData;

console.log("rows = " + arr.length + "\ncolumns: " + arr[0].length);
max = min = 0;
arr.forEach((row)=>{
    row.forEach((content) =>{
        if (content < min) {
            min = content;
        }
        else if(content > max){
            max = content;
        }
    })
});
console.log("max: " + max, "\nmin: " + min);