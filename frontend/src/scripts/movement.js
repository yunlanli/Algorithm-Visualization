import { drawArray } from './initialization';

function swapWrapper(canvas, array, element1, element2,velocity){
    var ctx = canvas.getContext('2d');
    var xTarget1 = element2.x;
    var xTarget2 = element1.x;
    swap();

    function swap(){
        // remove the current element on the canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // move element 1 and element 2
        moveX(element1, xTarget1);   
        moveX(element2, xTarget2);  
    
        let lastStep = element1.x === xTarget1;

        element1.color = lastStep? "rgba(0,0,200,0.3)" : "rgba(0,0,200,1)";
        element2.color = lastStep? "rgba(0,0,200,0.3)" : "rgba(0,0,200,1)";
    
        // draw array
        drawArray(array,canvas)
    
        // recursively draw until element reaches the targert coordinates
        if (!lastStep)
            window.requestAnimationFrame(swap);
    }

    function moveX(element,xTarget){
        // reset the x coordinates of the element1
        if (Math.abs(xTarget - element.x) <= velocity*0.1)
            element.x = xTarget;
        else if (xTarget < element.x)
            element.x -= velocity*0.1;
        else if (xTarget > element.x)
            element.x += velocity*0.1; 
    }
}

function highlightWrapper(canvas, array, elements, color, keepColor){
    if (elements.length == 0){
        return;
    }else{
        var prevColor = elements[0].color;
    }

    highlight(color);
    
    if(!keepColor){
        setTimeout(function(){
            highlight(prevColor);
        },1000);
    }

    function highlight(color){
        var ctx = canvas.getContext('2d');

        // iterate over elements to highlight
        for (var el of elements){
            el.color = color;
        }

        // draw new frame
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawArray(array,canvas);
    }
}

export { swapWrapper as swap, highlightWrapper as highlight };