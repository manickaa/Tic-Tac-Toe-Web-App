import React from 'react'

import './Tile.css';

const Tile = (props) => {
	return (
		<button className="Tile" onClick={props.onClick} disabled={props.disabled}>
			{props.value}
		</button>
	)
};

export default Tile;