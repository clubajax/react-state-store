import React from 'react';
import store from './store';
import { STATE, CREATED, MOUNTED, UNMOUNTED } from './constants';

export default function connect (namespaces, Component) {
	class StateHOC extends React.Component {
		constructor (props) {
			super(props);

			this[STATE] = CREATED;

			let subscription = namespaces;
			if (/{{/.test(namespaces)) {
				subscription = namespaces.replace(/{{\w*}}/g, (word) => {
					word = word.replace('{{', '').replace('}}', '');
					return props[word];
				});
			}

			store.subscribe(subscription, this);
		}

		componentDidMount () {
			this[STATE] = MOUNTED;
		}

		componentWillUnmount () {
			this[STATE] = UNMOUNTED;
			store.unsubscribe(this);
		}

		render () {
			return React.createElement(Component,  Object.assign(this.state, this.props));
		}
	}
	return StateHOC;
}