/* 
* Initializes a canvas with a visualization of a given size of
* array of random integers
* @param size: the size of the array of random integer
*/
export default function initializeCanvaArray(size,canvas){

    // initialize canvas
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);

    // prepare array for drawing
    var array = createRandomArray(size);
    transformArrayFormat(array,canvas.width,canvas.height,"rgba(0,0,200,0.3");

    // draw array on the canvas node
    drawArray(array,canvas);
}

/* 
* Find the html canvas element and creates a visualization of
* the array by drawing an rectange proportional to element size
* for each element in the input array
* @param array: the array to draw on the canvas element
*/
function drawArray(array,canvas) {
  // var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // iterate over the elements in the random array
    for (let key in array){
      const current = array[key]
      
      // draw rectangle
      ctx.fillStyle = current.color;
      ctx.fillRect(current.x,current.y,current.width,current.height);
    }
  }
}

/* 
* Generates an array of integers of random size
* @param size: the desired size of the integer array
* @return an array of objects
*/
function createRandomArray(size){
  return Array(size).fill().map(() => {
    return {value: Math.floor(Math.random()*size*10)}
  });
}

function transformArrayFormat(array, width, height, color){
  // width of each element based on array size and canvas width
  const WIDTH = Math.floor(width/array.length);
  const SPACE = 0.1*WIDTH;
  
  function getHeight(val){
    var largest = 10*array.length;

    return Math.floor(val*(height/largest));
  }

  // iterate over elements in the array and set attributes necessary for drawing
  for (let key in array){
    let current = array[key];

    current.width = WIDTH - SPACE;
    current.height = getHeight(current.value);
    current.x = key*WIDTH + SPACE;
    current.y = height - current.height;
    current.color = color;   
  }
}
