import React from 'react';
import connect from '../connect';

class InstanceTest extends React.Component {

	render () {
		return (
			<div className="instance-test">Instance Test {this.props.name}</div>
		);
	}
}

export default connect('{{namespace}}.name', InstanceTest);
