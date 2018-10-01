import React from 'react';
import store from '../store';

export default class Container extends React.Component {

	render () {
		return (
			<div className="buttons">
				<button onClick={() => {
					store.set(store.get().one ? { one: false } : { one: true });
				}}>Uno</button>
				<button onClick={() => {
					store.set(store.get().two ? { two: false } : { two: true });
				}}>Dos</button>

				<input onChange={(e) => {
					store.set({ onename: e.target.value });
				}}/>

				<input onChange={(e) => {
					store.set({ twoname: e.target.value });
				}}/>

			</div>
		);
	}
}