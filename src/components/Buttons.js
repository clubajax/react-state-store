import React from 'react';
import store from '../store';

export default class Container extends React.Component {

	render () {
		return (
			<div className="buttons">
				<button className="uno" onClick={() => {
					store.set('one', !store.get('one'));
				}}>Uno
				</button>
				<button onClick={() => {
					store.set('two', !store.get('two'));
				}}>Dos
				</button>

				<input onChange={(e) => {
					console.log('CHANGE:::', e.target.value);
					store.set('one.name', e.target.value);
				}} />

				<input onChange={(e) => {
					store.set('two.name', e.target.value);
				}} />

			</div>
		);
	}
}
