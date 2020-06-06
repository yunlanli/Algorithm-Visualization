import * as Animation from "../Animation/movement";
import * as Paint from "../Animation/coloring";
import { drawArray, getWidthSpace, calculateX, calculateY } from '../Animation/initialization';
import { color } from '../../styles/GlobalStyles';

var canvasHeight, canvasWidth, VELOCITY, WIDTH, SPACE;

/* Wrapper of calculateY that gives canvasHeight as the first argument */
function calcY(element) {
    return calculateY(canvasHeight, element);
}

/* Wrapper of calculateX that gives WIDTH and SPACE as its 2nd and 3rd argument */
function calcX(index) {
    return calculateX(index, WIDTH, SPACE);
}

function mergeSort(canvas, array, velocity) {
    canvasHeight = canvas.height; canvasWidth = canvas.width;
    [WIDTH, SPACE] = getWidthSpace(canvasWidth, array.length);
    VELOCITY = velocity;

    var tmpArray = new Array(array.length).fill();
    // initially all elements are highlighted
    mergeSortHelper(array,tmpArray,0,array.length-1);
    drawArray(array,canvas,1);
}

function mergeSortHelper(array, tmpArray, begin, end) {
    // Base case: 1 element
    if (begin === end) {
        Paint.shade(array,[array[begin]]); // shade array[begin] after it is sorted
        return;
    }

    // Partition the array into 2 equal halves and merge sort them
    const mid = Math.floor(begin + (end - begin)/2);
    Paint.shade(array,array.slice(mid+1,end+1))
    mergeSortHelper(array, tmpArray, begin, mid);
    Paint.restoreColor(array, array.slice(mid+1, end+1));
    mergeSortHelper(array, tmpArray, mid+1, end);

    // Merge the 2 halves
    merge(array, tmpArray, begin, mid, end);
}

function merge(array, tmpArray, leftBegin, leftEnd, rightEnd){
    // 2 pointers, one for each half
    var i = leftBegin, j = leftEnd+1, pos = leftBegin;

    // Color the left half with mergeLeft, the right half with mergeRight
    Paint.highlight(array,array.slice(leftBegin,j),color.mergeLeft);
    Paint.highlight(array,array.slice(j,rightEnd+1),color.mergeRight);

    // put the smaller element in the corresponding position in tmpArray after each comparison
    while ( i<=leftEnd && j<=rightEnd ){
        Paint.highlight(array, [array[i],array[j]], color.selected);
        if (array[i].value < array[j].value){
            Animation.move(array, array[i], calcX(pos), calcY(array[i]), VELOCITY);
            Paint.restoreColor(array, [array[i]]);
            tmpArray[pos++] = array[i++];
        } else {
            Animation.move(array, array[j], calcX(pos), calcY(array[j]), VELOCITY);
            Paint.restoreColor(array, [array[j]]);
            tmpArray[pos++] = array[j++];
        }
            
    }

    // put all elements in the first halve to tmpArray
    while ( i<=leftEnd ){
        Animation.move(array, array[i], calcX(pos),calcY(array[i]), VELOCITY);
        Paint.restoreColor(array, [array[i]]);
        tmpArray[pos++] = array[i++];
    }
        

    // put all elements in the second halve to tmpArray
    while ( j<= rightEnd ){
        Animation.move(array, array[j], calcX(pos), calcY(array[j]), VELOCITY);
        Paint.restoreColor(array, [array[j]]);
        tmpArray[pos++] = array[j++];
    }
        

    // copy the elements from tmpArray to the same positions in Array
    // we update the animation after copying all elements from tmpArray to Array rather than during the iteration
    // This is because the first parameter array of Animation.move is the array of all elements with up-to-date x,y,color, etc
    // Before copying all elements over to the original array, at k, array[k+1:RightEnd+1] contains the wrong ordering of these elements
    for (let k = leftBegin; k <= rightEnd; k++)
        array[k] = tmpArray[k]; 
    for (let k = leftBegin; k <= rightEnd; k++)
        Animation.move(array, array[k], calcX(k), array[k].y[1], VELOCITY); 

    // shade after being sorted
    Paint.shade(array,array.slice(leftBegin, rightEnd+1));
}

export default mergeSort;