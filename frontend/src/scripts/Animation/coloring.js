import { color } from '../../styles/GlobalStyles';

function setColor(array, elements, color){
    // extract id for element comparison purposes later
    const ids = elements.map(el => el.id);

    // update color and x list for each element
    for (let el of array){
        // set color for input elements
        if (ids.includes(el.id)){
            el.color.push(color);
        }else{
            el.color.pushLast();
        }

        // concatenate last x&y coord and update numFrames
        el.x.pushLast();
        el.y.pushLast();
        el.numFrames++;
    }
}

function restoreColor(array, elements, stepTracker){
    if (stepTracker) { stepTracker.push(array[0].numFrames+1); }

    setColor(array, elements, color.default);
}

function shade(array, elements, stepTracker){
    if (stepTracker) { stepTracker.push(array[0].numFrames+1); }

    setColor(array, elements, color.wait);
}

function highlight(array, elements, color, stepTracker){
    /* when stepTracker is provided, we book-keep the starting frame of
    the next step by pushing it to the stepTracker array */
    if (stepTracker) { stepTracker.push(array[0].numFrames+1); }

    const FRAMES = 1;
    
    for (let i = 0; i < FRAMES; i++){
        setColor(array,elements,color);
    }
}

export { highlight, setColor, restoreColor, shade };