import React from 'react';
import { initializeCanvaArray } from '../scripts/initialization';
// import { moveWrapper } from '../scripts/movement';
import { quickSort } from '../scripts/quickSort';

export default class Sorting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            textField: "Create an array to sort",
            data: [],
        }
        this.canvas = React.createRef();

        this.handleInput = this.handleInput.bind(this);
        this.initialize = this.initialize.bind(this);
        this.moveElement = this.moveElement.bind(this);
    }

    handleInput(e){
        e.preventDefault();
        this.setState({textField: e.target.value});
        console.log(this.state.data);
    }

    initialize(){
        const canvas = this.canvas.current;
        var dataArray = initializeCanvaArray(15,canvas);

        // console.log(dataArray);
        this.setState({data: dataArray});
    }

    moveElement(){
        const canvas = this.canvas.current;
        quickSort(canvas,this.state.data,1);
    }

    render(){
        return(
            <div>
                <input type="text" placeholder="Enter Something" onChange={this.handleInput}/>
                
                <canvas width='700' height='700' ref={this.canvas}/>

                <button type="button" onClick={this.initialize}>
                        {this.state.textField}
                </button>

                <button type="button" onClick={this.moveElement}>Move</button>


            </div>  
        ); 
    }       
}