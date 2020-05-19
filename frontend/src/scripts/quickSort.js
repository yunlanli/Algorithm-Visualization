import * as Animation from "./movement"
import { drawArray } from './initialization';

function quickSort(canvas,array,velocity){
    // calls the helper method
    quickSortHelper(0,array.length-1);
    drawArray(array,canvas,1);
    
    // helper method that sorts the input array
    // and draws every step on the canvas
    function quickSortHelper(begin,end){
        // if end - begin < 3, use insertion sort
        if( end - begin < 3){
            insertionSort(begin,end);
            console.log("Insertion Sort: begin: " + begin +", end: " + end);
        }else{
            // select the pivot using medianOfThree algorithm
            medianOfThree(begin,end);

            // partition the array into 3 parts
            var pivot = partition(begin,end);

            // recursively quicksort the partitions
            quickSortHelper(begin,pivot-1);
            quickSortHelper(pivot+1,end);
        }
    }

    function insertionSort(begin,end){
        var j;

        for (let i=begin+1; i<= end; i++){
            for (j=i; j>0 && ( array[j].value - array[j-1].value < 0 ); j--){
                // Animation will show that j and j-1 element swap positions
                Animation.swap(canvas,array,array[j],array[j-1],velocity);
                swap(j,j-1)
            }
        }
    }

    function medianOfThree(begin,end){
        console.log("Median of 3: begin: " + begin +", end: " + end);
        var mid = Math.floor(begin + (end - begin)/2);
        console.log("begin: " + begin + ",mid: " + mid + ", end: " + end);
    
        // select pivot
        var compareResult = array[begin].value - array[mid].value;
        if (compareResult > 0){
            Animation.swap(canvas,array,array[begin],array[mid],velocity);
            swap(begin,mid);
        }
    
        compareResult = array[mid].value - array[end].value;
        if (compareResult > 0){
            Animation.swap(canvas,array,array[mid],array[end],velocity);
            swap(mid,end);
        }
    
        compareResult = array[begin].value - array[mid].value;
        if (compareResult > 0){
            Animation.swap(canvas,array,array[begin],array[mid],velocity);
            swap(begin,mid);
        }
    
        // move the pivot to the second to last position
        Animation.swap(canvas,array,array[mid],array[end-1],velocity);
        swap(mid,end-1);
    }

    function partition(begin,end){
        // 2 pointers
        var i = begin + 1;
        var j = end - 2;
        var pivot = array[end-1].value;

        // keep partitioning while the 2 pointers have not crossed
        while(i <= j){
            // while pointer i hasn't encountered an item bigger than the pivot
            // DON'T USE '<= '! It runs the risk of letting i go beyond pivot
            while (array[i].value - pivot < 0){ 
                i++;
                // Animation.highlight(canvas,array,[array[i]],'rgba(0,0,200,0.8)',false);
            }
            // mark the element in the wrong partition as red
            // Animation.highlight(canvas,array,[array[i]],'rgba(200,0,0,0.8)',true);


            // while pointer j hasn't encountered an item smaller than the pivot
            while (array[j].value - pivot > 0) { 
                j--; 
                // Animation.highlight(canvas,array,[array[j]],'rgba(0,0,200,0.8)',false);
            }
            // mark the element in the wrong partition as red
            // Animation.highlight(canvas,array,[array[j]],'rgba(200,0,0,0.8)',true);

            // swap i,j elements if i,j haven't crossed
            if (i < j){
                Animation.swap(canvas,array,array[i],array[j],velocity);
                swap(i,j);
                console.log("swap " + i + ", " + j);
            }
        }

        // move the pivot in between the 2 partitions, i.e after j, before i
        Animation.swap(canvas,array,array[i],array[end-1],velocity);
        swap(i,end-1);

        // return the position of the pivot
        return i;
    }

    function swap(pos1,pos2){
        var tmp = array[pos1];
        array[pos1] = array[pos2];
        array[pos2] = tmp;
    }
}

export { quickSort };