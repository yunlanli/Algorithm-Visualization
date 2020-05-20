import * as Animation from "./movement"
import { drawArray } from './initialization';
import { color } from '../styles/GlobalStyles';

function quickSort(canvas,array,velocity){
    // calls the helper method
    quickSortHelper(0,array.length-1);
    // all elements sorted, restore color
    Animation.restoreColor(array, array);

    drawArray(array,canvas,1);
    
    // helper method that sorts the input array
    // and draws every step on the canvas
    function quickSortHelper(begin,end){
        // if end - begin < 3, use insertion sort
        if( end - begin < 3){
            insertionSort(begin,end);
        }else{
            // select the pivot using medianOfThree algorithm
            medianOfThree(begin,end);

            // partition the array into 3 parts
            var pivot = partition(begin,end);

            // recursively quicksort the partitions
            // shade the part that is not going to be sorted next
            Animation.shade(array, array.slice(pivot, end+1));
            Animation.restoreColor(array, array.slice(begin, pivot));
            quickSortHelper(begin,pivot-1);
            Animation.shade(array, array.slice(begin, pivot+1));
            Animation.restoreColor(array, array.slice(pivot+1, end+1));
            quickSortHelper(pivot+1,end);
        }
    }

    function insertionSort(begin,end){
        var j;

        for (let i=begin+1; i<= end; i++){
            for (j=i; j>0 && ( array[j].value - array[j-1].value < 0 ); j--){
                // Animation will show that j and j-1 element swap positions
                Animation.highlight(array, [array[j-1],array[j]], color.selected);
                Animation.swap(array, array[j-1], array[j], velocity);
                Animation.restoreColor(array, [array[j-1],array[j]]);
                swap(j-1,j);
            }
            
            // show the last comparison that failed
            if ( j > 0 ){
                Animation.highlight(array, [array[j-1],array[j]], color.selected);
                Animation.restoreColor(array, [array[j-1],array[j]]);
            } 
        }

        // sub-array sorted, shade sub-array
        Animation.shade(array, array.slice(begin, end+1));
    }

    // high-level animation that displays a single comparison
    function compare(pos1, pos2){
        var compareResult = array[pos1].value - array[pos2].value;
        Animation.highlight(array,[array[pos1],array[pos2]], color.selected);
        if (compareResult > 0){
            Animation.swap(array,array[pos1],array[pos2],velocity);
            swap(pos1,pos2);
        }
        Animation.setColor(array,[array[pos1],array[pos2]], color.default);
    }

    function medianOfThree(begin,end){
        var mid = Math.floor(begin + (end - begin)/2);
    
        // select pivot
        compare(begin, mid);
        compare(mid, end);
        compare(begin, mid);
    
        // move the pivot to the second to last position
        Animation.setColor(array, [array[mid]], color.pivot);
        Animation.swap(array,array[mid],array[end-1],velocity);
        swap(mid,end-1);
    }

    function partition(begin,end){
        // 2 pointers
        var i = begin + 1;
        var j = end - 2;
        var pivot = array[end-1].value;

        // highlight i,jth element
        Animation.highlight(array, [array[i], array[j]], color.selected);

        // keep partitioning while the 2 pointers have not crossed
        while(i <= j){
            // while pointer i hasn't encountered an item bigger than the pivot
            // DON'T USE '<= '! It runs the risk of letting i go beyond pivot
            while (array[i].value - pivot < 0){ 
                if (i !== j)
                    Animation.restoreColor(array, [array[i]]);
                Animation.highlight(array, [array[++i]], color.selected);
                
            }

            // while pointer j hasn't encountered an item smaller than the pivot
            while (array[j].value - pivot > 0) { 
                if (j !== i)
                    Animation.restoreColor(array,[array[j]]); 
                Animation.highlight(array, [array[--j]], color.selected);
                
            }

            // swap i,j elements if i,j haven't crossed
            if (i < j){
                Animation.swap(array,array[i],array[j],velocity);
                swap(i,j);
            }   
        }
        
        // restore the color of the pointed elements
        Animation.restoreColor(array, [array[i],array[j]]);
        
        // move the pivot in between the 2 partitions, i.e after j, before i
        Animation.swap(array,array[i],array[end-1],velocity);
        swap(i,end-1);

        // Restore the color of the pivot
        Animation.restoreColor(array, [array[i]]);

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