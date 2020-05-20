import { color } from '../styles/GlobalStyles';

function swapWrapper(array, element1, element2,velocity){
    var frames = element1.numFrames+1;
    var xTarget1 = element2.x[frames];
    var xTarget2 = element1.x[frames];
    var step = Math.floor(velocity * 0.1) + 1;
    swap();

    function swap(){
        while (element1.x[element1.numFrames+1] !== xTarget1){
            // move element 1 and element 2
            moveXY(element1, element2, xTarget1, xTarget2);
        }
    }

    function moveXY(element1,element2, xTarget1, xTarget2){
        var lastColorIndex = element1.numFrames;

        //update the x list of all elements
        for (let current of array){
            if (current.id === element1.id){
                moveX(element1, xTarget1);
            }else if(current.id === element2.id){
                moveX(element2, xTarget2);
            }else{
                current.x.push(current.x[++current.numFrames]);                   
            }

            // update color list
            current.color.push(current.color[lastColorIndex]);                
        }
 
    }

    function moveX(element,xTarget){
        // update #frames and retrive last x position
        var lastX = element.x[++element.numFrames];
        // push the new x coordinate to element.x
        if (Math.abs(xTarget - lastX) <= step){
            element.x.push(xTarget);
        }else if (xTarget < lastX){
            element.x.push(lastX - step);
        }else if (xTarget > lastX){
            element.x.push(lastX + step);
        }
    }
}

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

        // concatenate last x coord and update numFrames
        el.x.push(el.x[++el.numFrames])
    }
}

function highlight(array, elements, color){
    const FRAMES = 60;
    
    for (let i = 0; i < FRAMES; i++){
        setColor(array,elements,color);
    }
}

export { swapWrapper as swap, highlight, setColor };