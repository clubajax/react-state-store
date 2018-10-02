import store from '../src/store';
import { CREATED, MOUNTED, STATE, UNMOUNTED } from '../src/constants';

export default class FauxComponent {
	constructor (options) {
		this[STATE] = CREATED;

		Object.assign(this, options);

		Object.keys(options).forEach((key) => {
			if (key === 'subscribe') {
				store.subscribe(this, options[key]);
			} else {
				this[key] = options[key];
			}
		});

		this.setStateCallback = options.setStateCallback;

	}

	setState (state) {
		this.state = Object.assign(this.state || {}, state);
		if (this.setStateCallback) {
			this.setStateCallback();
		}
	}

	getState () {
		return JSON.stringify(this.state);
	}

	unmount () {
		this[STATE] = UNMOUNTED;
	}

	mount () {
		this[STATE] = MOUNTED;
	}
}
