import * as Animation from "../Animation/movement"
import * as Paint from "../Animation/coloring";
import { swap } from './sortHelper';
import { color } from '../../styles/GlobalStyles';

function shellSort(array,velocity) {
    Paint.shade(array,array);

    var hibbardIncrement = getHibbardIncrement(array.length);
    // iterate over hibbard increments, from large to small
    var currentGroup;
    for (let gap of hibbardIncrement){
        for (let i = gap; i<array.length; i++) {
            currentGroup = getGroup(array, i, gap);
            // highlight all elements in the same group as array[i]
            Paint.highlight(array, currentGroup, color.mergeLeft);
            Paint.highlight(array, [array[i]], color.pivot); // highlight the element to be insertion sorted

            for (var j = i; j >= gap && array[j].value < array[j-gap].value; j -= gap) {
                Paint.highlight(array,[array[j-gap]],color.selected);
                Animation.swap(array,array[j],array[j-gap],velocity);
                Paint.highlight(array,[array[j-gap]],color.mergeLeft);

                swap(array, j, j-gap);
            }

            // show the last comparison that failed
            if (j > gap) {
                Paint.highlight(array,[array[j-gap]],color.selected);
                Paint.highlight(array,[array[j-gap]],color.mergeLeft);
            }

            // done, shade the group elements
            Paint.shade(array, currentGroup);
        }
    }

    Paint.restoreColor(array,array); // sorted, restore color
}

function getHibbardIncrement(length) {
    var increments = [], k = 1, nextIncrement = Math.pow(2,k) - 1;

    while ( nextIncrement < length) {
        increments.push(nextIncrement);
        nextIncrement = Math.pow(2,++k) - 1;
    }
    return increments.reverse();
}

function getGroup(array, pos, gap) {
    var groupElements = [];

    // compute the idx of the first group element
    var start = pos % gap, next = start;
    
    // add all group elements iteratively
    while (next < array.length) {
        groupElements.push(array[next]);
        next += gap;
    }

    return groupElements;
}

export default shellSort;