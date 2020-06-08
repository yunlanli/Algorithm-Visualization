import React, { useState } from 'react';
import styled from 'styled-components';
import * as GlobalStyles from '../styles/GlobalStyles';

/* Todo: 
* 1. Remove the effect of highlighting Button borders after it is clicked
* 2. When the mouse hoves over the button, make the button background less transparent
*/
const Button = styled.button`
    font-size: 1rem;
    /* font-family:  */
    padding: 0.25em 1em;
    border-radius: 2rem;
    margin: 0 1rem;
    border: 2px solid ${GlobalStyles.color.button};
    background: transparent;
    white-space: nowrap; /* prevents line breaking */
    width: max-content;
    transition: background .2s;

    &:hover {
        background: ${GlobalStyles.color.lightGray}
    }
    
    &:focus {
        outline: none;
    }
`;

const SliderWrapper = styled.div`
    width: 10rem;
`;

const Slider = styled.input`
    -webkit-appearance: none;
    width: 10rem;
    height: 0.5rem;
    border-radius: 2rem;  
    background: ${GlobalStyles.color.lightGray};
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;

    &:hover {
        opacity: 1;
    }

    /* slider handle css for Chrome, Opera, Safari, Edge) */
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: ${GlobalStyles.color.slider};
        cursor: pointer;
    }

    /* slider handle css for FireFox */
    &::-moz-range-thumb {
        width: 4rem;
        height: 4rem;
        background: ${GlobalStyles.color.slider};
        cursor: pointer;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const AnimatedWrapper = styled(Wrapper)`
    height: 100%;
    overflow: hidden;
    animation: expand 1.5s ease forwards;
    
    @keyframes expand {
        from {width: 0%}
        to {width: 100%}
    }
`;


const RangeSlider = (props) => {
    return (
        // If a react component has a value attribute
        // without an onChange funtion, it will be read only
        <SliderWrapper>
            <Slider 
                type = "range" 
                min = {props.min} 
                max = {props.max} 
                value = {props.value}
                step = {props.step || 1}
                onChange = {props.onChange}/>

            <label> {props.label} </label>
        </SliderWrapper>
            
    )
}

const CustomButton = React.forwardRef((props,ref) => {
    const [clicked, setClick] = useState(false);

    const handleClick = () => {
        let prevCancelled = clicked && ref.current.style.color === "black";
        
        props.restoreSibling();
        props.cb.apply(props.cb, props.params);

        if (!clicked || prevCancelled) {
            ref.current.style.backgroundColor = GlobalStyles.color.slider;
            ref.current.style.color = "white";
        }

        if (!prevCancelled)
            setClick(!clicked);
    }

    return (
        <Button ref={ref} onClick={() => handleClick()}> {props.content} </Button>
    )
})

/* HOC of CustomButton in Selector Component 
* TODO: 
* Currently, if Type has hooks, it will result in a more hooks rendered than the previous render error
* To avoid this, we can turn it into a class component. This will allow us to elevate the state of each button
* to avoid the state of button is not in sync with user events. Specifically, a button gets cancelled through
* clicking another button.
*/
const Type = (props) => {
    const [list, eventHandler,type] = props;

    // for each button instance, create a ref for Type to control its appearance
    const refs = new Array(list.length).fill(0).map(() => React.createRef());
    const NAMETOREF = {};
    for (let idx in list)
        NAMETOREF[list[idx]] = refs[idx];
        

    // function to unhighlight selected button if any after another button is selected
    // this ensures that only one button gets highlighted each time
    const restore = () => {
        if (type !== "none"){
            console.log(type);
            // restore the appearance of the selected component
            let selectedBtn = NAMETOREF[type].current;

            selectedBtn.style.backgroundColor = "white";
            selectedBtn.style.color = "black";
        }
    }

    return(
        <AnimatedWrapper>
            {list.map((name, idx) => 
                <CustomButton   key={name} 
                                ref = {refs[idx]}
                                restoreSibling={restore}
                                cb={eventHandler}
                                params={[name]}
                                content={name}
                />)}
        </AnimatedWrapper>
    )
}

// Takes in a list of algorihtms
function Selector(props) {
    const [display, setDisplay] = useState(false);
    const [algorithm, setAlgorithm] = useState('Algorithms');

    // show "Algorithm" when none is selected or display is false
    const showText = () => {
        return display ? 'Algorithms' : algorithm;
    }

    const updateState = (routine) => {
        setAlgorithm(routine);
        props.cb(routine);
    }

    return (
        <Wrapper>
            <Button onClick={() => {setDisplay(!display)} }>
                {showText()} 
            </Button> 

            {display && Type([props.list,updateState,props.currentType])} 
        </Wrapper>
        
    )
}

export { Button, RangeSlider as Slider, Selector };