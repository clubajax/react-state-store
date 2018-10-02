import React from 'react';
import connect from '../connect';

class DisplayOne extends React.Component {

	render () {
		return (
			<div>Display One {this.props.name}</div>
		);
	}
}

export default connect('one.name', DisplayOne);
