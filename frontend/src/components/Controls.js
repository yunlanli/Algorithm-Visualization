import React from 'react';
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
    margin: 3rem 1rem;
    border: 2px solid ${GlobalStyles.color.button};
    background: transparent;

    &:hover {
        opacity: 10;
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

export { Button, RangeSlider as Slider };