import React from 'react';
import styled from 'styled-components';
import { initializeCanvaArray } from '../scripts/Animation/initialization';
import Sort from '../scripts/Sorting/Sort';
import NavBar from './Navbar';
import { Button, Slider, Selector } from './Controls'; 
import { ROUTINES, INFO } from '../assets/Sorting';
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

export default class Sorting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            length: 50,
            data: [],
            velocity: 20,
            inAnimation: false,
            type: "none",
        }
        this.canvas = React.createRef();

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.initialize = this.initialize.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.setSpeed = this.setSpeed.bind(this);
        this.selectRoutine = this.selectRoutine.bind(this);
    }

    handleSliderChange(e){
        console.log(e.target.value);
        this.setState({length: e.target.value});
        e.preventDefault();

        this.initialize();
    }

    initialize(){
        // empty previous data
        this.setState({data: []});

        const canvas = this.canvas.current;
        // Transform (string) length to a base 10 number
        const arraySize = parseInt(this.state.length, 10);
        var dataArray = initializeCanvaArray(arraySize,canvas);

        // console.log(dataArray);
        this.setState({data: dataArray});
    }

    moveElement(){
        this.setState({inAnimation: true});

        const canvas = this.canvas.current;
        const velocity = parseInt(this.state.velocity,10);

        if (this.state.type === "none")
            Sort[DEFAULTALGORITHM](canvas,this.state.data,velocity);
        else
            Sort[this.state.type](canvas,this.state.data,velocity);

        // TODO: update this.state.inAnimation from drawArray
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

    render(){
        return(
            <div>
                <NavBar />
                <Selector list={ROUTINES} cb={this.selectRoutine} currentType={this.state.type} />

                <Content>
                    <Animation>
                        <CustomCanvas width='700' height='500' ref={this.canvas}/>

                        <ControllerWrapper>
                            <Button onClick={this.initialize}>
                                Create a random array
                            </Button>
                            <Slider min="15" max="100" value={this.state.length} onChange={this.handleSliderChange} label = "Array Size" />

                            <Button onClick={this.moveElement}>{this.state.inAnimation ? "Pause" : "Move"}</Button>
                            <Slider min = "1" max = "800" step="60" value={this.state.velocity} onChange={this.setSpeed} label="Speed" />
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