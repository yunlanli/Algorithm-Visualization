import React from 'react';
import styled from 'styled-components';
import { initializeCanvaArray } from '../scripts/initialization';
// import { moveWrapper } from '../scripts/movement';
import { quickSort } from '../scripts/quickSort';
import NavBar from './Navbar';
import { Button, Slider } from './Controls'; 

const ControllerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: 3rem;
`;

const CustomCanvas = styled.canvas`
    display: flex;
    margin: 10rem auto 0rem auto;
`;

export default class Sorting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            length: 50,
            data: [],
            velocity: 20
        }
        this.canvas = React.createRef();

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.initialize = this.initialize.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.setSpeed = this.setSpeed.bind(this);
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
        const canvas = this.canvas.current;
        const velocity = parseInt(this.state.velocity,10);
        quickSort(canvas,this.state.data,velocity);
    }

    setSpeed(e){
        this.setState({velocity: e.target.value});
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <NavBar />
                {/* <input type="number" placeholder="Array Size" onChange={this.handleInput}/> */}
                
                
                <CustomCanvas width='700' height='500' ref={this.canvas}/>

                <ControllerWrapper>
                    <Button onClick={this.initialize}>
                        Create a random array
                    </Button>
                    <Slider min="15" max="100" value={this.state.length} onChange={this.handleSliderChange} label = "Array Size" />

                    <Button onClick={this.moveElement}>Move</Button>
                    <Slider min = "1" max = "800" step="60" value={this.state.velocity} onChange={this.setSpeed} label="Speed" />
                    {/* <input type="number" placeholder = "Animation Speed" onChange={this.setSpeed} /> */}
                </ControllerWrapper>
                


            </div>  
        ); 
    }       
}