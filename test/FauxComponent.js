import store from '../src/store';

export default class FauxComponent {
	constructor (options) {
		this.updater = {
			mounted: options.mounted !== undefined ? options.mounted : true,
			isMounted () {
				return this.mounted;
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
		this.updater.mounted = false;
	}

	mount () {
		this.updater.mounted = true;
	}
}
