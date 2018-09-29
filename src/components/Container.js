import React from 'react';
import List from './List';
import Buttons from './Buttons';

export default class Container extends React.Component {

	constructor () {
		super();
		this.state = {};
	}

	componentDidMount () {

	}

	render () {
		return (
			<div>
				<Buttons/>
				<List/>
			</div>
		);
	}
}