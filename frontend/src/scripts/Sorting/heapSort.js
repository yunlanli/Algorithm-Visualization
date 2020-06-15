import * as Animation from "../Animation/movement"
import * as Paint from "../Animation/coloring";
import { swap } from './sortHelper';
import { color } from '../../styles/GlobalStyles';

var array, velocity, currentSize;
const leftChild = (pos) => (pos+1)*2 - 1;
const parent = (pos) => Math.floor( (pos+1)/2 - 1 );

function heapSort(...args) {
    [array, velocity] = args;
    currentSize = array.length;

    buildHeap();
    while( currentSize > 0) {
        deleteMax();
    }
    Paint.restoreColor(array,array);
}

/*
* 1. Build Heap: percolate down from the rightmost non-leaf to the root
* 2. deleteMax: percolate down
* Note the array starts from index 0 instead of 1, so need extra steps to calculate parent, child indices
*/
function buildHeap() {
    Paint.shade(array, array);
    var start = Math.floor(currentSize/2)-1; // gives the index of the last non-leaf or first leaf
    
    // iterate over all non-leafs and fix their positions
    for (let i = start; i >= 0; i--){
        percolateDown(i);
    }
}

function deleteMax() {
    Paint.highlight(array, [array[0]], color.selected);
    // currentSize - 1 is the index of the last element in the max heap
    Animation.swap(array, array[0], array[--currentSize], velocity);
    swap(array, 0, currentSize);

    Paint.restoreColor(array, [array[currentSize]]);

    // Find the appropriate position for the new root
    percolateDown(0);
}

/* @param root: the index of the root element that we want to insert in the right position */
function percolateDown(root) {
    // iterative percolateDown
    var max, min, children, LC = leftChild(root);
    Paint.highlight(array, [array[root]], color.pivot); // highlight the element to percolate down

    
    while(LC < currentSize){
        children = LC+1 === currentSize ? [array[LC]] : [array[LC],array[LC+1]];
        max = ( children.length === 1 || array[LC].value > array[LC+1].value ) ? LC : LC + 1;
        
        // highlight root's children, then only the max of root's children
        Paint.highlight(array, children, color.selected);
        if (children.length > 1 ) {
            min = max === LC ? LC + 1 : LC;
            Paint.shade(array, [array[min]]);
        }

        // root only has one child
        if (array[root].value < array[max].value){
            Animation.swap(array, array[root], array[max], velocity);
            Paint.shade(array, [array[max]]);
            swap(array, root, max);
            root = max;
        } else {
            Paint.shade(array, [array[max],array[root]]); // done, unhighlight max, root
            return;
        }

        LC = leftChild(root);
    }

    // LC > currentSize, unhighlight the element at parent[LC] - the element orginally at root
    Paint.shade(array, [array[parent(LC)]]);
}


export default heapSort;