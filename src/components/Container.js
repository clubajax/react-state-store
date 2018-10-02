import React from 'react';
import List from './List';
import Buttons from './Buttons';

export default class Container extends React.Component {

	render () {
		return (
			<div className="container">
				<Buttons />
				<List />
			</div>
		);
	}
}