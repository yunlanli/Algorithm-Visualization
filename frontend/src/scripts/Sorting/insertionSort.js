import * as Animation from "../Animation/movement"
import * as Paint from "../Animation/coloring";
import { swap } from './sortHelper';
import { color } from '../../styles/GlobalStyles';

function insertionSort(array,velocity,step) {
    // shade all elements first
    Paint.shade(array,array);
    // calls the private helper method
    insertionSortHelper(array,0,array.length-1,velocity,step,true);

    // insertion done, restore the color of all elements in array
    Paint.restoreColor(array,array);
}

function insertionSortHelper(array,begin,end,velocity,step,use3Color=false,){
    var j, toHighlight;

    for (let i=begin+1; i<= end; i++){
        // If use3color for this animation, color the selected element as color.pivot
        if (use3Color)
            Paint.highlight(array,[array[i]],color.pivot,step);

        for (j=i; j>begin && ( array[j].value < array[j-1].value ); j--){
            // Animation will show that j and j-1 element swap positions
            toHighlight = use3Color ? [array[j-1]] : [array[j-1],array[j]];
            Paint.highlight(array, toHighlight, color.selected, step);
            Animation.swap(array, array[j-1], array[j], velocity);
            Paint.restoreColor(array, toHighlight);
            swap(array,j-1,j);
        }
        
        // show the last comparison that failed
        if ( j > begin ){
            toHighlight = use3Color ? [array[j-1]] : [array[j-1],array[j]];
            Paint.highlight(array, toHighlight, color.selected, step);
            Paint.restoreColor(array, [array[j-1],array[j]]);
        }

        // when j = begin, we have hit the front of the array,
        // if we use3Color, restore the color of the current selected element
        if (j === begin && use3Color) Paint.restoreColor(array,[array[begin]],step);

    }

    // sub-array sorted, shade sub-array
    Paint.shade(array, array.slice(begin, end+1));
}

export { insertionSortHelper };
export default insertionSort;