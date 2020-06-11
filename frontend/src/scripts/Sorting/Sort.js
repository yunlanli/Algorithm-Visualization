import insertionSort from './insertionSort';
import quickSort from './quickSort';
import mergeSort from './mergeSort';
import shellSort from './shellSort';
import bubbleSort from './bubbleSort';
import heapSort from './heapSort';

var Sort = {
    "Insertion Sort": insertionSort,
    "Quick Sort": quickSort,
    "Merge Sort": mergeSort,
    "Shell Sort": shellSort,
    "Bubble Sort": bubbleSort,
    "Heap Sort": heapSort,
}


export default Sort;