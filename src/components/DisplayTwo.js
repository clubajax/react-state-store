import React from 'react';
import store from '../store';

export default class DisplayTwo extends React.Component {

	constructor () {
		super();
		store.subscribe(this, 'two.name');
	}

	render () {
		return (
			<div>Display Two {this.state.name}</div>
		);
	}
}