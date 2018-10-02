import React from 'react';
import store from './store';
import { STATE, CREATED, MOUNTED, UNMOUNTED } from './constants';

export default function connect (namespaces, Component) {
	class StateHOC extends React.Component {
		constructor () {
			super();
			this[STATE] = CREATED;
			store.subscribe(this, namespaces);
		}

		componentDidMount () {
			this[STATE] = MOUNTED;
		}

		componentWillUnmount () {
			this[STATE] = UNMOUNTED;
			store.unsubscribe(this);
		}

		render () {
			// console.log('hoc.render', this.state);
			return (
				<Component {...this.state} />
			)
		}
	}
	return StateHOC;
}