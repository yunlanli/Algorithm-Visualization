import * as Animation from "../Animation/movement";
import { drawArray, getWidthSpace, calculateX } from '../Animation/initialization';
import { color } from '../../styles/GlobalStyles';

var canvasHeight, canvasWidth, VELOCITY, WIDTH, SPACE;

function mergeSort(canvas, array, velocity) {
    canvasHeight = canvas.height; canvasWidth = canvas.width;
    [WIDTH, SPACE] = getWidthSpace(canvasWidth, array.length);
    VELOCITY = velocity;

    var tmpArray = new Array(array.length).fill();
    // initially all elements are highlighted
    mergeSortHelper(array,tmpArray,0,array.length-1);
    console.log(array);
    drawArray(array,canvas,1);
}

function mergeSortHelper(array, tmpArray, begin, end) {
    // Base case: 1 element
    if (begin === end) {
        Animation.shade(array,[array[begin]]); // shade array[begin] after it is sorted
        return;
    }

    // Partition the array into 2 equal halves and merge sort them
    const mid = Math.floor(begin + (end - begin)/2);
    Animation.shade(array,array.slice(mid+1,end+1))
    mergeSortHelper(array, tmpArray, begin, mid);
    Animation.restoreColor(array, array.slice(mid+1, end+1));
    mergeSortHelper(array, tmpArray, mid+1, end);

    // Merge the 2 halves
    merge(array, tmpArray, begin, mid, end);
}

function merge(array, tmpArray, leftBegin, leftEnd, rightEnd){
    // 2 pointers, one for each half
    var i = leftBegin, j = leftEnd+1, pos = leftBegin;

    // Color the left half with mergeLeft, the right half with mergeRight
    Animation.highlight(array,array.slice(leftBegin,j),color.mergeLeft);
    Animation.highlight(array,array.slice(j,rightEnd+1),color.mergeRight);

    // put the smaller element in the corresponding position in tmpArray after each comparison
    while ( i<=leftEnd && j<=rightEnd ){
        Animation.highlight(array, [array[i],array[j]], color.selected);
        if (array[i].value < array[j].value){
            Animation.move(array, array[i], calculateX(pos,WIDTH,SPACE), calculateY(array[i]), VELOCITY);
            Animation.restoreColor(array, [array[i]]);
            tmpArray[pos++] = array[i++];
        } else {
            Animation.move(array, array[j], calculateX(pos,WIDTH,SPACE), calculateY(array[j]), VELOCITY);
            Animation.restoreColor(array, [array[j]]);
            tmpArray[pos++] = array[j++];
        }
            
    }

    // put all elements in the first halve to tmpArray
    while ( i<=leftEnd ){
        Animation.move(array, array[i], calculateX(pos,WIDTH,SPACE),calculateY(array[i]), VELOCITY);
        Animation.restoreColor(array, [array[i]]);
        tmpArray[pos++] = array[i++];
    }
        

    // put all elements in the second halve to tmpArray
    while ( j<= rightEnd ){
        Animation.move(array, array[j], calculateX(pos,WIDTH,SPACE), calculateY(array[j]), VELOCITY);
        Animation.restoreColor(array, [array[j]]);
        tmpArray[pos++] = array[j++];
    }
        

    // copy the elements from tmpArray to the same positions in Array
    for (let k = leftBegin; k <= rightEnd; k++){
        array[k] = tmpArray[k];
        /* BUGG! CAN'T FIGURE OUT WHY */
        Animation.move(array, array[k],calculateX(k,WIDTH,SPACE), array[k].y[1], VELOCITY);
    }

    // shade after being sorted
    Animation.shade(array,array.slice(leftBegin, rightEnd+1));
}

/* calculates the y coordinate to begin drawing an element on the lower row */
function calculateY(element) {
    return Math.floor(canvasHeight- element.height);
}

export default mergeSort;