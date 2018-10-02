import React from 'react';
import DisplayOne from './DisplayOne';
import DisplayTwo from './DisplayTwo';
import connect from '../connect';

class List extends React.Component {
	render () {
		return (
			<div className="list">
				<h4>list</h4>
				<div>
					{this.props.one && <DisplayOne />}
					{this.props.two && <DisplayTwo />}
				</div>
			</div>
		);
	}
}

export default connect('one,two', List);
