import React from 'react';
import DisplayOne from './DisplayOne';
import DisplayTwo from './DisplayTwo';
import store from '../store';

export default class List extends React.Component {

	constructor () {
		super();
		store.subscribe(this, 'one,two');
	}

	render () {
		return (
			<div className="list">
				<h4>list</h4>
				<div>
					{this.state.one && <DisplayOne />}
					{this.state.two && <DisplayTwo />}
				</div>
			</div>
		);
	}
}