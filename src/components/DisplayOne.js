import React from 'react';
import store from '../store';

export default class DisplayOne extends React.Component {

	constructor () {
		super();
		store.subscribe(this, 'one.name');
	}

	// componentDidMount () {
	// 	console.log('mount', this);
	// 	console.log('mounted', this.updater.isMounted(this));
	//
	// }
	//
	// componentWillUnmount () {
	// 	setTimeout(() => {
	// 		console.log('unmount', this);
	// 		console.log('mounted', this.updater.isMounted(this));
	// 	}, 30);
	// }

	render () {
		return (
			<div>Display One {this.state.name}</div>
		);
	}
}