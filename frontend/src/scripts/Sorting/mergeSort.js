function mergeSort(canvas, array, velocity) {
    var tmpArray = new Array(array.length).fill();
    mergeSortHelper(array,tmpArray,0,array.length-1);
}

function mergeSortHelper(array, tmpArray, begin, end) {
    // Base case: 1 element
    if (begin === end) return;

    // Partition the array into 2 equal halves and merge sort them
    const mid = Math.floor(begin + (end - begin)/2);
    mergeSortHelper(array, tmpArray, begin, mid);
    mergeSortHelper(array, tmpArray, mid+1, end);

    // Merge the 2 halves
    merge(array, tmpArray, begin, mid, end);
}

function merge(array, tmpArray, leftBegin, leftEnd, rightEnd){
    // 2 pointers, one for each half
    var i = leftBegin, j = leftEnd+1, pos = leftBegin;

    // put the smaller element in the corresponding position in tmpArray after each comparison
    while ( i<=leftEnd && j<=rightEnd ){
        if (array[i] < array[j])
            tmpArray[pos++] = array[i++];
        else
            tmpArray[pos++] = array[j++];
    }

    // put all elements in the first halve to tmpArray
    while ( i<=leftEnd )
        tmpArray[pos++] = array[i++];

    // put all elements in the second halve to tmpArray
    while ( j<= rightEnd )
        tmpArray[pos++] = array[j++];

    // copy the elements from tmpArray to the same positions in Array
    for (let k = leftBegin; k <= rightEnd; k++)
        array[k] = tmpArray[k];
}

export default mergeSort;