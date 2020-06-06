import { color } from '../../styles/GlobalStyles';

function setColor(array, elements, color){
    // extract id for element comparison purposes later
    const ids = elements.map(el => el.id);
    const lastFrame = array[0].numFrames;

    // update color and x list for each element
    for (let el of array){
        // set color for input elements
        if (ids.includes(el.id)){
            el.color.push(color);
        }else{
            el.color.push(el.color[lastFrame]);
        }

        // concatenate last x&y coord and update numFrames
        el.x.push(el.x[++el.numFrames])
        el.y.push(el.y[el.numFrames])
    }
}

function restoreColor(array, elements){
    setColor(array, elements, color.default);
}

function shade(array, elements){
    setColor(array, elements, color.wait);
}

function highlight(array, elements, color){
    const FRAMES = 1;
    
    for (let i = 0; i < FRAMES; i++){
        setColor(array,elements,color);
    }
}

export { highlight, setColor, restoreColor, shade };