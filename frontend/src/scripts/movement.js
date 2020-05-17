import { drawArray } from './initialization';

function moveWrapper(canvas,array,pos,velocity, xTarget){
    var ctx = canvas.getContext('2d');
    var element = array[pos];
    console.log(element);
    move();

    function move(){
        // remove the current element on the canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // reset the x coordinates of the current element and color
        if (Math.abs(xTarget - element.x) <= velocity*0.1)
            element.x = xTarget;
        else if (xTarget < element.x)
            element.x -= velocity*0.1;
        else if (xTarget > element.x)
            element.x += velocity*0.1;       
    
        let lastStep = element.x === xTarget;

        element.color = lastStep? "rgba(0,0,200,0.3)" : "rgba(0,0,200,1)";
    
        // draw array
        drawArray(array,canvas)
    
        // recursively draw until element reaches the targert coordinates
        if (!lastStep)
            window.requestAnimationFrame(move);
    }
}

export default moveWrapper;