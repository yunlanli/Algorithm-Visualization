import * as Animation from "../Animation/movement"
import * as Paint from "../Animation/coloring";
import { color } from '../../styles/GlobalStyles';
import { swap } from './sortHelper';
import { insertionSortHelper as insertionSort} from './insertionSort';

function quickSort(array,velocity,step){
    // calls the helper method
    quickSortHelper(0,array.length-1);
    // all elements sorted, restore color
    Paint.restoreColor(array, array);
    
    // helper method that sorts the input array
    // and draws every step on the canvas
    function quickSortHelper(begin,end){
        // if end - begin < 3, use insertion sort
        if( end - begin < 3){
            insertionSort(array,begin,end,velocity,step);
        }else{
            // select the pivot using medianOfThree algorithm
            medianOfThree(begin,end);

            // partition the array into 3 parts
            var pivot = partition(begin,end);

            // recursively quicksort the partitions
            // shade the part that is not going to be sorted next
            Paint.shade(array, array.slice(pivot, end+1));
            Paint.restoreColor(array, array.slice(begin, pivot));
            quickSortHelper(begin,pivot-1);

            Paint.shade(array, array.slice(begin, pivot));
            Paint.restoreColor(array, array.slice(pivot+1, end+1));
            quickSortHelper(pivot+1,end);
        }
    }

    // high-level animation that displays a single comparison
    function compare(pos1, pos2){
        var compareResult = array[pos1].value - array[pos2].value;
        Paint.highlight(array,[array[pos1],array[pos2]], color.selected,step);
        if (compareResult > 0){
            Animation.swap(array,array[pos1],array[pos2],velocity);
            swap(array,pos1,pos2);
        }
        Paint.restoreColor(array,[array[pos1],array[pos2]]);
    }

    function medianOfThree(begin,end){
        var mid = Math.floor(begin + (end - begin)/2);
    
        // select pivot
        compare(begin, mid);
        compare(mid, end);
        compare(begin, mid);
    
        // move the pivot to the second to last position
        Paint.setColor(array, [array[mid]], color.pivot);
        Animation.swap(array,array[mid],array[end-1],velocity);
        swap(array,mid,end-1);
    }

    function partition(begin,end){
        // 2 pointers
        var i = begin + 1;
        var j = end - 2;
        var pivot = array[end-1].value;

        // highlight i,jth element
        Paint.highlight(array, [array[i], array[j]], color.selected,step);

        // keep partitioning while the 2 pointers have not crossed
        while(i <= j){
            // while pointer i hasn't encountered an item bigger than the pivot
            // DON'T USE '<= '! It runs the risk of letting i go beyond pivot
            while (array[i].value < pivot ){ 
                if (i !== j)
                    Paint.restoreColor(array, [array[i]]);
                Paint.highlight(array, [array[++i]], color.selected,step);
                
            }

            // while pointer j hasn't encountered an item smaller than the pivot
            while (array[j].value >= pivot ) { 
                if (j !== i)
                    Paint.restoreColor(array,[array[j]]); 
                Paint.highlight(array, [array[--j]], color.selected,step);
                
            }

            // swap i,j elements if i,j haven't crossed
            if (i < j){
                Animation.swap(array,array[i],array[j],velocity);
                swap(array,i,j);
            }   
        }
        
        // restore the color of the pointed elements
        Paint.restoreColor(array, [array[i],array[j]]);
        
        // move the pivot in between the 2 partitions, i.e after j, before i
        Animation.swap(array,array[i],array[end-1],velocity,step);
        swap(array,i,end-1);

        // Restore the color of the pivot
        Paint.restoreColor(array, [array[i]]);

        // return the position of the pivot
        return i;
    }
}    



export default quickSort;