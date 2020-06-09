import * as Animation from "../Animation/movement"
import * as Paint from "../Animation/coloring";
import { drawArray } from '../Animation/initialization';
import { swap } from './sortHelper';
import { color } from '../../styles/GlobalStyles';

function bubbleSort(canvas,array,velocity) {
    // shade all elements to start
    Paint.shade(array, array);

    {
        // j book keeps the index of the last element in the unsorted array
        var stop = false, j, pair; 

        // iterate over each unsorted array
        for ( j = array.length - 1; !stop && j > 0 ; j--) {
            // highlight the current unsorted array
            Paint.highlight(array, array.slice(0,j+1), color.mergeLeft);

            stop = true;
            for (let i = 0; i < j; i++) {
                // highlight the elements to compare
                    pair = array.slice(i,i+2);
                    Paint.highlight(array, pair, color.selected);
                    
                    if (array[i].value > array[i+1].value) {
                        Animation.swap(array, ...pair,velocity);
                        swap(array,i,i+1);
                        stop = false;
                    }
                
                Paint.highlight(array, pair, color.mergeLeft); // unhighlight
            }

            // another item sorted, shade all
            Paint.shade(array, array.slice(0,j));
            Paint.restoreColor(array,[array[j]]);
        }
    }

    // sorted, restore color and start animation
    Paint.restoreColor(array, array);
    drawArray(array, canvas, 1);
}

export default bubbleSort;