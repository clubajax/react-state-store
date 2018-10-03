import { STATE, CREATED, MOUNTED } from './constants';

export default {

	set (namespace, value) {
		if (typeof namespace === 'object') {
			Object.assign(state, namespace);
		} else {
			state[namespace] = value;
		}

		items.forEach((item, i) => {
			if (includes(item, namespace)) {
				setState(item, { namespace });
			}
		});
	},

	get (name) {
		// TODO: ensure returned objects are copied
		return name ? state[name] : state;
	},

	subscribe (namespaces, instance) {
		items.push({
			instance,
			namespaces: namespaces.split(',').map(str => str.trim())
		});
		setState(items[items.length - 1]);
	},

	unsubscribe (instance) {
		const index = items.findIndex(item => item.instance === instance);
		if (index === -1) {
			console.log('instance NOT FOUND');
			return;
		}
		items.splice(index, 1);
	},

	flush () {
		items.length = 0;
		state = {};
	}
};

let state = {};
const items = [];

function setState (item, options = {}) {

	const namespace = options.namespace;

	if (item.instance.state && noChanges(item, namespace)) {
		return;
	}

	const stateForInstance = {};
	item.namespaces.forEach((ns) => {
		stateForInstance[key(ns)] = state[ns];
	});

	if (item.instance[STATE] === CREATED) {
		if (item.instance.state) {
			Object.assign(item.instance.state, stateForInstance);
		} else {
			item.instance.state = stateForInstance;
		}
	} else if (item.instance[STATE] === MOUNTED) {
		item.instance.setState(stateForInstance);
	}
}

function noChanges (item, namespace) {
	let hasChange = false;
	if (typeof namespace === 'string') {
		return item.instance.state && item.instance.state[key(namespace)] === state[namespace];

	} else if (typeof namespace === 'object') {
		item.namespaces.forEach((ns) => {
			if (item.instance.state[ns] !== state[ns]) {
				hasChange = true;
			}
		});
	}
	return !hasChange;
}

function includes (item, ns) {
	if (typeof ns === 'string') {
		return item.namespaces.includes(ns);
	}
	const keys = Object.keys(ns);
	for (let i = 0; i < keys.length; i++) {
		if (item.namespaces.includes(keys[i])) {
			return true;
		}
	}
	return false;
}

function key (namespace) {
	const parts = namespace.split('.');
	return parts[parts.length - 1];
}
