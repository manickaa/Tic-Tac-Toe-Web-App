
export const checkIfMatchIsWon = (boxes) => {
	const winSituations = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,4,8],
		[2,4,6],
		[0,3,6],
		[1,4,7],
		[2,5,8]
	]

	for (let i =0; i < winSituations.length; i++) {
		const [a,b,c] = winSituations[i]

		if(boxes[a] && boxes[a] === boxes[b] && boxes[b] === boxes[c]) {
			return boxes[a]
		}
	}
};

export const checkIfBoardIsFullyFilled = (boxes) => {
	
	for(let i=0; i<boxes.length; i++) {
		if(boxes[i] !== null){
			continue
		}
		else{
			return false
		}
	}
	return true
};