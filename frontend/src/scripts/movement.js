import { color } from '../styles/GlobalStyles';
import { drawArray } from './initialization';

function swapWrapper(canvas, array, element1, element2,velocity){
    var frames = element1.numFrames+1;
    var xTarget1 = element2.x[frames];
    var xTarget2 = element1.x[frames];
    var step = Math.floor(velocity * 0.1) + 1;
    swap();

    function swap(){
        while (element1.x[element1.numFrames+1] !== xTarget1){
            // console.log(element1.x[element1.numFrames+1] + "targert: " + xTarget1);
            // move element 1 and element 2
            moveXY(element1, element2, xTarget1, xTarget2);
        }

        // revert the color of the 2 elements back to the original color
        element1.color = color.default;
        element2.color = color.default;

        // draw array if more than 100 Frames
        // if (element1.numFrames >= 100)
        //     drawArray(array,canvas);
    }

    function moveXY(element1,element2, xTarget1, xTarget2){
            //update the x list of all elements
            for (let current of array){
                if (JSON.stringify(current) === JSON.stringify(element1)){
                    moveX(element1, xTarget1);
                }else if(JSON.stringify(current) === JSON.stringify(element2)){
                    moveX(element2, xTarget2);
                }else{
                    current.x.push(current.x[++current.numFrames]);
                }
                    
            }
 
    }

    function moveX(element,xTarget){
        element.color = color.selected;
        
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

function highlightWrapper(canvas, array, elements, color, keepColor){
    if (elements.length === 0){
        return;
    }

    var ctx = canvas.getContext('2d');
    highlight();

    function highlight(){
        // update element attributes
        for (var el of elements){
            el.color = color.compare;
            el.highlight = true;
        }
    }
}

export { swapWrapper as swap, highlightWrapper as highlight };