import { color } from '../../styles/GlobalStyles';
import CustomArray from './customArray';

/* 
* Initializes a canvas with a visualization of a given size of
* array of random integers
* @param size: the size of the array of random integer
* @param arr: the object to use for intialize the canvas 
*/
function initializeCanvaArray(size,canvas,twoRows=false, arr){
    // initialize canvas
    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);

    // prepare array for drawing
    var array = arr ? modifyExistingArray(arr) : createRandomArray(size);
    transformArrayFormat(array,canvas.width,canvas.height,color.default,twoRows);

    // draw array on the canvas node
    drawArray(array,canvas,0);

    return array;
}

/* 
* Find the html canvas element and creates a visualization of
* the array by drawing an rectange proportional to element size
* for each element in the input array
* @param array: the array to draw on the canvas element
*/
function drawArray(array,canvas,offset,...args) {
  var count = offset;
  var [callback= ()=>{}, raf=[], singleFrame=false] = args;

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    draw();
    // window.cancelAnimationFrame(raf);

    function draw(){
      if (array[0].numFrames === 0)
        return;
  
      count++;

      // clear canvas
      ctx.clearRect(0,0,canvas.width,canvas.height);
      // iterate over the elements in the random array
      for (let current of array){
        // draw rectangle
        ctx.fillStyle = current.color[count-1];
        ctx.fillRect(current.x[count],current.y[count],current.width,current.height);
        --current.numFrames;
      }

      if (array[0].numFrames > 0 && !singleFrame)
        raf[0] = window.requestAnimationFrame(draw);
      else
        callback();
    }
  }
}

/* 
* Generates an array of integers of random size
* @param size: the desired size of the integer array
* @return an array of objects
*/
const SCALEFACTOR = 10;
function createRandomArray(size){
  return Array(size).fill().map(() => {
    return {
      value: Math.floor(Math.random()*size*SCALEFACTOR)+1,
      x: new CustomArray(0,true),
      y: new CustomArray(0,true),
      numFrames: 1
    }
  });
}

function modifyExistingArray(array) {
  return array.map((obj) => {
    return {
      value: obj.value,
      x: new CustomArray(0,true),
      y: new CustomArray(0,true),
      numFrames: 1,
    }
  });
}

const ROWMARGIN = 5;
function transformArrayFormat(array, width, height, color, twoRows=false){
  // width of each element based on array size and canvas width
  // Ensure that both attributes are type integer
  const [WIDTH, SPACE] = getWidthSpace(width, array.length);
  
  function getHeight(val, twoRows){
    var largest = SCALEFACTOR*array.length+1+ROWMARGIN;
    var scaledVal = val*(height/largest);
    
    return twoRows ? Math.floor(scaledVal/2+1) : Math.floor(scaledVal+1);
  }

  // iterate over elements in the array and set attributes necessary for drawing
  for (let key in array){
    let current = array[key];

    current.id = key; // unique id for each element, used for identification
    current.width = WIDTH - SPACE;
    current.height = getHeight(current.value,twoRows);
    current.color = new CustomArray(color,true);
    current.x.push(calculateX(key,WIDTH,SPACE));
    current.y.push(calculateY(height,current,twoRows));
  }
}

function getWidthSpace(canvasWidth, numElements) {
  var width = Math.floor(canvasWidth/numElements);
  var space = Math.floor(0.1*width);
  if (space === 0)
    space = 1;

    return [width, space];
}

function calculateX(index, width, space) {
  return index*width + space;
}

function calculateY(canvasHeight, element, twoRows=false) {
  if (twoRows)
    return Math.floor(canvasHeight/2- element.height);

  return canvasHeight - element.height;
}

export { initializeCanvaArray, drawArray, getWidthSpace, calculateX, calculateY };