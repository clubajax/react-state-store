import store from '../src/store';

export default class FauxComponent {
	constructor (options) {
		this.updater = {
			isMounted () {
				return true;
			}
		};

		Object.assign(this, options);

		Object.keys(options).forEach((key) => {
			if (key === 'subscribe') {
				store.subscribe(this, options[key]);
			} else {
				this[key] = options[key];
			}
		});


	}

	setState (state) {
		this.state = Object.assign(this.state || {}, state)
	}

	getState () {
		return JSON.stringify(this.state);
	}
}
