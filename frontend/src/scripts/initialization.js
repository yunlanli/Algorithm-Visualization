import { color } from '../styles/GlobalStyles';

/* 
* Initializes a canvas with a visualization of a given size of
* array of random integers
* @param size: the size of the array of random integer
*/
export function initializeCanvaArray(size,canvas){
    console.log(size);
    // initialize canvas
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);

    // prepare array for drawing
    var array = createRandomArray(size);
    transformArrayFormat(array,canvas.width,canvas.height,color.default);

    // draw array on the canvas node
    drawArray(array,canvas);

    return array;
}

/* 
* Find the html canvas element and creates a visualization of
* the array by drawing an rectange proportional to element size
* for each element in the input array
* @param array: the array to draw on the canvas element
*/
export function drawArray(array,canvas) {
  // for (let current of array)
  //   console.log(current.value);

  // var canvas = document.getElementById("canvas");
  var raf;
  var count = 0;

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    draw();
    // window.cancelAnimationFrame(raf);

    function draw(){
      count++;

      // clear canvas
      ctx.clearRect(0,0,canvas.width,canvas.height);
      // iterate over the elements in the random array
      for (let current of array){
        // draw rectangle
        ctx.fillStyle = current.color;
        ctx.fillRect(current.x[count],current.y,current.width,current.height);
        --current.numFrames;
      }

      if (array[0].numFrames > 0)
        raf = window.requestAnimationFrame(draw);
    }

    // all frames drawn, preserve the last one of x only for later use
      // for (let element of array)
      //   element.x = [element.x[numFrames]];

  }
}

/* 
* Generates an array of integers of random size
* @param size: the desired size of the integer array
* @return an array of objects
*/
function createRandomArray(size){
  return Array(size).fill().map(() => {
    return {
      value: Math.floor(Math.random()*size*10)+1,
      x: [0],
      numFrames: 1
    }
  });
}

function transformArrayFormat(array, width, height, color){
  // width of each element based on array size and canvas width
  // Ensure that both attributes are type integer
  const WIDTH = Math.floor(width/array.length);
  var SPACE = Math.floor(0.1*WIDTH);
  if (SPACE === 0)
    SPACE = 1;
  
  function getHeight(val){
    var largest = 10*array.length;

    return Math.floor(val*(height/largest));
  }

  // iterate over elements in the array and set attributes necessary for drawing
  for (let key in array){
    let current = array[key];

    current.width = WIDTH - SPACE;
    current.height = getHeight(current.value);
    current.x.push(key*WIDTH + SPACE);
    current.y = height - current.height;
    current.color = color;
    current.highlight = false;   
  }
}