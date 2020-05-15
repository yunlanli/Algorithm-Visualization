/* 
* Initializes a canvas with a visualization of a given size of
* array of random integers
* @param size: the size of the array of random integer
*/
function initializeCanvaArray(size){
    var array = createRandomArray(size);
    drawArray(array);
}



/* 
* Find the html canvas element and creates a visualization of
* the array by drawing an rectange proportional to element size
* for each element in the input array
* @param array: the array to draw on the canvas element
*/
function drawArray(array) {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    
    // iterate over the elements in the random array
    for (let key in array){
        // coords of rectangle
      let space = 2;
      let height = array[key];
      let width = Math.floor(canvas.width/array.length)-space;
      let xStart = key*(width+space);
      let yStart = 150-height;
      
      console.log(height);
      
        // draw rectangle
      ctx.fillStyle = "rgba(0,0,200,0.5)";
      ctx.fillRect(xStart,yStart,width,height);
    }
  }
}

/* 
* Generates an array of integers of random size
* @param size: the desired size of the integer array
* @return an array object of ints
*/
function createRandomArray(size){
return Array(size).fill().map(() => Math.floor(Math.random()*size*10));
}