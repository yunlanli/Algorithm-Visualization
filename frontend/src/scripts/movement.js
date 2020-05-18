import { color } from '../styles/GlobalStyles';
import { drawArray } from './initialization';

function swapWrapper(canvas, array, element1, element2,velocity){
    var frames = element1.numFrames+1;
    var xTarget1 = element2.x[frames];
    var xTarget2 = element1.x[frames];
    console.log(xTarget1 + " " + xTarget2);
    swap();

    function swap(){
        while (element1.x[element1.numFrames+1] !== xTarget1){
            console.log(element1.x[element1.numFrames+1]);
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
        console.log("hi");
            // !! need to update the x list of all element
            for (let current of array){
                if (JSON.stringify(current) === JSON.stringify(element1)){
                    console.log("x1Current: " + element1.x[element1.numFrames] + ", x1Target: " + xTarget1+"\n\n");
                    moveX(element1, xTarget1);
                    // console.log("element1: " + element1.x);
                }else if(JSON.stringify(current) === JSON.stringify(element2)){
                    console.log("x2Current: " + element2.x[element2.numFrames] + ", x2Target: " + xTarget2 + "\n\n");
                    moveX(element2, xTarget2);
                    // console.log("element2: " + element2.x);
                }else{
                    current.x.push(current.x[current.numFrames++]);
                    // console.log("Other elements: " + current.x);
                }
                    
            }
 
    }

    function moveX(element,xTarget){
        element.color = color.selected;
        
        console.log("element: " + element.value);
        var lastX = element.x[element.numFrames+1];
        console.log("lastX: " + lastX);
        // push the new x coordinate to element.x
        if (Math.abs(xTarget - lastX) <= velocity*0.1){
            console.log("Last Step!");
            element.x.push(xTarget);
        }else if (xTarget < lastX){
            console.log("Move Left.  nextX: " + (lastX - velocity*0.1));
            element.x.push(lastX - velocity*0.1);
            console.log(element.x);
        }else if (xTarget > lastX){
            console.log("Move Right.  nextX: " + (lastX + velocity*0.1));
            element.x.push(lastX + velocity*0.1); 
            console.log(element.x);
        }
            
        
        // update element's numFrames attribute
        element.numFrames++;
        // console.log("Frames after update: " + element.numFrames);
    }
}

function highlightWrapper(canvas, array, elements, color, keepColor){
    if (elements.length == 0){
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