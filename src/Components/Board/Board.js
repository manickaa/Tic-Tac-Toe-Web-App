import React, {Component} from 'react'
import Tile from '../Tile/Tile'
import './Board.css';
import * as functions from './BoardFunctions';

class Board extends Component {

	constructor(props) {
		super(props)
		//Initialize state
		this.state = {
			boxes: Array(9).fill(null),
			history: [],
			xIsNext: true,
			disabled: Array(9).fill(false)
		}
	}

	clickHandler = (index) => {
		//do nothing
		let boxes = [...this.state.boxes]
		let disabled = [...this.state.disabled]
		let history = this.state.history

		boxes[index] = this.state.xIsNext ? 'X' : 'O'
		disabled[index] = true

		history.push(boxes[index])

		//update state
		this.setState({
			boxes: boxes,
			history: history,
			xIsNext: !this.state.xIsNext,
			disabled: disabled,
			matchFinished: this.state.matchFinished
		})

	}
	
	startNewGameHandler = () => {

		this.setState({
			boxes: Array(9).fill(null),
			history: [],
			xIsNext: true,
			disabled: Array(9).fill(false)
		})
	}

	// disableUncheckedButtons = (event) => {
	// 	event.preventDefault();
	// 	let boxes = [...this.state.boxes]
	// 	let disabled = [...this.state.disabled]
	// 	for(let i =0; i< boxes.length; i++) {
	// 		if(boxes[i] == null) {
	// 			disabled[i] = true
	// 		}
	// 	}
	// 	this.setState({
	// 		boxes: boxes,
	// 		history: this.state.history,
	// 		xIsNext: this.state.xIsNext,
	// 		disabled: disabled,
	// 		matchFinished: this.state.matchFinished
	// 	})
	// }

	render() {
		let status = "Welcome to the game"
		
		let row = [];
		for(let i =0; i<9; i++) {
			row[i] = <Tile value={this.state.boxes[i]} onClick={this.clickHandler.bind(this,i)} disabled={this.state.disabled[i]}/>
		}

		const winner = functions.checkIfMatchIsWon(this.state.boxes)
		const fullyFilled = functions.checkIfBoardIsFullyFilled(this.state.boxes)

		//Check if the match is won => update the status as won / lose
		if(winner) {
			status = `${winner} has won the game`
			const boxes = [...this.state.boxes]
			for(let i =0; i<boxes.length; i++) {
				if(boxes[i] == null) {
					row[i] = <Tile value={this.state.boxes[i]} onClick={this.clickHandler.bind(this,i)} disabled={!this.state.disabled[i]}/>
				}
			}
		}
		//check if the match is draw => update the status as draw
		else if(!winner && fullyFilled) {
			status = "Draw Match"
		}
		
		//else, update the status of whose turn is next
		else{
			status = `Its is ${this.state.xIsNext ? 'X' : 'O'}'s turn' now`
		}

		return(
			<div className="Board">
				<div className="GameArea">
					<div className="ButtonRow">
						{row[0]}
						{row[1]}
						{row[2]}
					</div>
					<div className="ButtonRow">
						{row[3]}
						{row[4]}
						{row[5]}
					</div>
					<div className="ButtonRow">
						{row[6]}
						{row[7]}
						{row[8]}
					</div>
				</div>
				<div className="Status">
					<p className="Content"> Status: {status} </p>
				</div>
				<button onClick = {() => this.startNewGameHandler()} disabled={this.state.matchFinished}> Start new game </button>
			</div>
		);
	}
}

export default Board;