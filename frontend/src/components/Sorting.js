import React from 'react';
import { initializeCanvaArray } from '../scripts/initialization';
// import { moveWrapper } from '../scripts/movement';
import { quickSort } from '../scripts/quickSort';

export default class Sorting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            length: 0,
            data: [],
        }
        this.canvas = React.createRef();

        this.handleInput = this.handleInput.bind(this);
        this.initialize = this.initialize.bind(this);
        this.moveElement = this.moveElement.bind(this);
    }

    handleInput(e){
        this.setState({length: e.target.value});
        e.preventDefault();
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
        quickSort(canvas,this.state.data,2000);
    }

    render(){
        return(
            <div>
                <input type="number" placeholder="Enter Something" onChange={this.handleInput}/>
                
                <canvas width='700' height='700' ref={this.canvas}/>

                <button type="button" onClick={this.initialize}>
                        Create a random array
                </button>

                <button type="button" onClick={this.moveElement}>Move</button>


            </div>  
        ); 
    }       
}