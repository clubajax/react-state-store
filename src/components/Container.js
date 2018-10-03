import React from 'react';
import List from './List';
import Buttons from './Buttons';
import InstanceTest from './InstanceTest';
import store from '../store';

export default class Container extends React.Component {

	render () {
		return (
			<div className="container">
				<Buttons />
				<List />
				<button className="for-instance" onClick={() => {
					store.set('aaa.name', 'NAME-A');
					store.set('bbb.name', 'NAME-B');
					store.set('ccc.name', 'NAME-C');
				}}>Set Instance Keys</button>
				<InstanceTest namespace="aaa" />
				<InstanceTest namespace="bbb" />
				<InstanceTest namespace="ccc" />
			</div>
		);
	}
}