function swapWrapper(array, element1, element2, velocity, stepTracker){
    if (stepTracker)
        stepTracker.push(element1.numFrames);
    
    var xTarget1 = element2.x.last();
    var xTarget2 = element1.x.last();
    var step = Math.floor(velocity * 0.1) + 1;
    swap();

    function swap(){
        while (element1.x.last() !== xTarget1){
            // move element 1 and element 2
            moveXY(element1, element2, xTarget1, xTarget2);
        }
    }

    function moveXY(element1,element2, xTarget1, xTarget2){
        //update the x list of all elements
        for (let current of array){
            // update color list and y
            current.color.pushLast();
            current.y.pushLast();
            
            if (current.id === element1.id){
                moveX(element1, xTarget1);
            }else if(current.id === element2.id){
                moveX(element2, xTarget2);
            }else{
                current.x.pushLast();
                current.numFrames++;                   
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

// Moves a single element to (xTarget, yTarget) with velocity 
function moveXY(array, element, xTarget, yTarget, velocity, stepTracker){
    if (stepTracker)
        stepTracker.push(element.numFrames);

    var xSame = xTarget - element.x.last() === 0;
    const slope = xSame ? 1 : Math.abs((yTarget - element.y.last())/(xTarget - element.x.last()));
    const xStep = Math.floor(velocity * 0.1) + 1;
    const yStep = Math.floor(velocity * 0.1 * slope)+1;
    const xDirection = getDirection(element.x.last(), xTarget);
    const yDirection = getDirection(element.y.last(), yTarget);

    while ( element.x.last() !== xTarget || element.y.last() !== yTarget){
        for (let el of array){
            if (el.id !== element.id){
                el.x.pushLast();
                el.y.pushLast();
            }else{
                var lastX = el.x.last(), lastY = el.y.last();

                if ( ( !xSame && Math.abs(xTarget - lastX) <= xStep ) || Math.abs(yTarget - lastY) <= yStep){
                    element.x.push(xTarget);
                    element.y.push(yTarget);
                }else{
                    element.x.push(lastX + xDirection * xStep);
                    element.y.push(lastY + yDirection * yStep);
                }
            }

            el.color.pushLast();
            el.numFrames++;      
        }
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

export { swapWrapper as swap, moveXY as move };