import React from 'react';
import connect from '../connect';

class DisplayTwo extends React.Component {

	render () {
		return (
			<div>Display Two {this.props.name}</div>
		);
	}
}

export default connect('two.name', DisplayTwo);
