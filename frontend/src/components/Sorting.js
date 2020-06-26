import React from 'react';
import styled from 'styled-components';
import { initializeCanvaArray, drawArray } from '../scripts/Animation/initialization';
import Sort from '../scripts/Sorting/Sort';
import NavBar from './Navbar';
import { Button, Slider, Selector } from './Controls'; 
import { ROUTINES } from '../assets/Sorting';
import InfoCard from './InfoCard';
 
const ControllerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: 3rem;
`;

const CustomCanvas = styled.canvas`
    display: flex;
    margin: 2rem auto 0rem auto;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
`;

const Animation = styled(Content)`
    flex-direction: column;
`;

const Info = styled(Content)`
    align-items: center;
    justify-content: center;
`;

const DEFAULTALGORITHM = "Insertion Sort";

/* @param array: index - step No. ; value - frame No.
 * @param target: current frame No. 
 * @return: current step No. */
function binarySearch(array, target) {
    var lo = 0, hi = array.length - 1, mid;

    while (lo <= hi) {
        mid = lo + Math.floor( (hi-lo)/2 );

        if (target === array[mid])
            return mid;
        else if (target > array[mid])
            lo = mid + 1;
        else
            hi = mid - 1;
    }

    return hi;
}

export default class Sorting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            length: 50,
            velocity: 20,
            inAnimation: -1, // -1: animation paused/not started, 0: in progress, 1: completed
            type: "none",
        }
        this.canvas = React.createRef();
        this.data = []; // objects(incl arrays) are passed by reference
        this.stepToFrame = [];
        this.raf = []; // raf[0] is the actual raf, we use an array here so that drawArray() can modify this directly

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.setSpeed = this.setSpeed.bind(this);
        this.selectRoutine = this.selectRoutine.bind(this);
        this.initialize = this.initialize.bind(this);
        this.pauseToMove = this.pauseToMove.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.timeTravel = this.timeTravel.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    componentDidMount() {
        this.initialize();
    }

    handleSliderChange(e){
        this.setState({length: e.target.value});
        e.preventDefault();

        this.initialize();
    }

    setSpeed(e){
        this.setState({velocity: e.target.value});
        e.preventDefault();
    }

    selectRoutine(routine) {
        // unhighlight the selected button if there is one
        if (this.state.type !== "Algorithms")
            this.setState({type: routine});
    }

    initialize(fromScratch=true){
        const canvas = this.canvas.current;
        // Transform (string) length to a base 10 number
        const arraySize = parseInt(this.state.length, 10);
        const twoRows = this.state.type === "Merge Sort" ? true : false;
        this.data = fromScratch ? initializeCanvaArray(arraySize,canvas,twoRows) :
                                  initializeCanvaArray(arraySize,canvas,twoRows,this.data);
        this.stepToFrame = [];
    }
    
    /* @param state: can be either -1 (temporarily paused) or 1(completed)*/
    pauseToMove(state=1) {
        // Button changes its display text from "Pause" to "Move"
        this.setState({inAnimation: state});
    }

    startAnimation() {
        // Animation in progress
        this.setState({inAnimation: 0});

        const canvas = this.canvas.current;
        const velocity = parseInt(this.state.velocity,10);
        
        // If the animation data hasn't been computed yet, we compute it.
        if (this.data[0].x.length === 2)
            if (this.state.type === "none")
                Sort[DEFAULTALGORITHM](this.data,velocity, this.stepToFrame);
            else
                // merge sort needs the last parameter canvas
                Sort[this.state.type](this.data,velocity,this.stepToFrame, canvas); 

        // this.state.inAnimation is updated by drawArray using the callback this.pauseToMove
        var nextFrame = this.data[0].x.length - this.data[0].numFrames - 1;
        drawArray(this.data, canvas, nextFrame, this.pauseToMove, this.raf);
    }

    moveElement(){
        // first determine the button state
        if (this.state.inAnimation === 0){
            window.cancelAnimationFrame(this.raf[0]);
            this.pauseToMove(-1);
        }else if (this.state.inAnimation === -1){
            this.startAnimation();
        }else{
            this.initialize(false);
            this.startAnimation();
        }
    }

    timeTravel(forward=false) {
        var total = this.data[0].x.length - 2, left = this.data[0].numFrames;
        var drawn = total - left;

        // binary search on numFrames to find the current Step
        var currentStep = binarySearch(this.stepToFrame, drawn);
        var toStep = forward ? currentStep+1 : currentStep-1;
        if (toStep < 0 || toStep > this.stepToFrame.length-1) return;

        // Modify the numFrame attribute of each object, re-draw Canvas
        var frames2draw = total - this.stepToFrame[toStep] + 1;
        for (let el of this.data)
            el.numFrames = frames2draw;

        // draw array
        const canvas = this.canvas.current;
        drawArray(this.data, canvas, this.stepToFrame[toStep], undefined, undefined, true);
    }

    prevStep() {
        this.timeTravel();
    }

    nextStep() {
        this.timeTravel(true);
    }

    render(){
        return(
            <div>
                <NavBar />
                <Selector list={ROUTINES} cb={this.selectRoutine} currentType={this.state.type} />

                <Content>
                    <Animation>
                        <CustomCanvas width='700' height='500' ref={this.canvas}/>

                        <ControllerWrapper>
                            <Button onClick={this.initialize}>Generate Array</Button>
                            <Slider min="2" max="100" value={this.state.length} onChange={this.handleSliderChange} label = "Array Size" />

                            <Button onClick={this.moveElement}>{this.state.inAnimation === 0 ? "Pause" : "Move"}</Button>
                            <Slider min = "1" max = "800" step="60" value={this.state.velocity} onChange={this.setSpeed} label="Speed" />

                            <Button onClick={this.prevStep}>Prev</Button>
                            <Button onClick={this.nextStep}>Next</Button>
                        </ControllerWrapper>

                    </Animation>

                    <Info>
                        <InfoCard type={this.state.type} />
                    </Info>

                </Content>
            </div>  
        ); 
    }       
}