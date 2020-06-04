import * as Animation from "./movement"
import { drawArray } from './initialization';
import { swap } from './sortHelper';
import { color } from '../styles/GlobalStyles';

function insertionSort(canvas,array,velocity) {
    
}

function insertionSortHelper(array,begin,end,velocity){
    var j;

    for (let i=begin+1; i<= end; i++){
        for (j=i; j>begin && ( array[j].value < array[j-1].value ); j--){
            // Animation will show that j and j-1 element swap positions
            Animation.highlight(array, [array[j-1],array[j]], color.selected);
            Animation.swap(array, array[j-1], array[j], velocity);
            Animation.restoreColor(array, [array[j-1],array[j]]);
            swap(array,j-1,j);
        }
        
        // show the last comparison that failed
        // when j = begin, we don't need to highlight anything since we have hit the 
        // front of the array, indicating there are NO MORE comparisons to do : )
        if ( j > begin ){
            Animation.highlight(array, [array[j-1],array[j]], color.selected);
            Animation.restoreColor(array, [array[j-1],array[j]]);
        }

    }

    // sub-array sorted, shade sub-array
    Animation.shade(array, array.slice(begin, end+1));
}

export { insertionSortHelper };
export default insertionSort;