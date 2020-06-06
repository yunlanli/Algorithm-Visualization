import { color } from '../../styles/GlobalStyles';

function swapWrapper(array, element1, element2, velocity){
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
            // update color list and y
            current.color.push(current.color[lastColorIndex]);
            current.y.push(current.y[current.numFrames+1]);
            
            if (current.id === element1.id){
                moveX(element1, xTarget1);
            }else if(current.id === element2.id){
                moveX(element2, xTarget2);
            }else{
                current.x.push(current.x[++current.numFrames]);                   
            }
          
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

// When xTarget < 0, it means that we only want to move Y
function moveXY(array, element, xTarget, yTarget, velocity){
    var lastFrame = element.numFrames+1;
    var lastColorIndex = element.numFrames;

    var xSame = xTarget - element.x[lastFrame] === 0;
    const slope = xSame ? 1 : Math.abs((yTarget - element.y[lastFrame])/(xTarget - element.x[lastFrame]));
    const xStep = Math.floor(velocity * 0.1) + 1;
    const yStep = Math.floor(velocity * 0.1 * slope)+1;
    const xDirection = getDirection(element.x[lastFrame], xTarget);
    const yDirection = getDirection(element.y[lastFrame], yTarget);
    var lastx = element.x[lastFrame], lasty = element.y[lastFrame];

    while ( element.x[lastFrame] !== xTarget || element.y[lastFrame] !== yTarget){
        for (let el of array){
            if (el.id !== element.id){
                el.x.push(el.x[lastFrame]);
                el.y.push(el.y[lastFrame]);
            }else{
                var lastX = el.x[lastFrame], lastY = el.y[lastFrame];

                if ( ( !xSame && Math.abs(xTarget - lastX) <= xStep ) || Math.abs(yTarget - lastY) <= yStep){
                    element.x.push(xTarget);
                    element.y.push(yTarget);
                }else{
                    element.x.push(lastX + xDirection * xStep);
                    element.y.push(lastY + yDirection * yStep);
                }
            }

            el.color.push(el.color[lastColorIndex]);
            el.numFrames++;      
        }
        lastFrame++;
        lastColorIndex++;
    }

    function getDirection(current, target) {
        if (target < 0)
            return 0;
        else if (current < target)
            return 1;
        else if ( current > target)
            return -1;

        return 0;
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

export {    swapWrapper as swap, moveXY as move,
            highlight, setColor, restoreColor, shade };