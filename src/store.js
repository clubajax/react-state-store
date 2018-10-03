import { STATE, CREATED, MOUNTED } from './constants';

const store = {
	delimiter: '.',

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
		return copy(name ? state[name] : state);
	},

	subscribe (namespaces, instance) {
		// console.log('subscribe', namespaces);
		items.push({
			instance,
			namespaces: namespaces.split(',').map(str => str.trim())
		});
		setState(items[items.length - 1]);
		return () => {
			this.unsubscribe(instance);
		}
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
		stateForInstance[key(ns)] = copy(state[ns]);
	});

	if (typeof item.instance === 'function') {
		item.instance(stateForInstance);
		return;
	}
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
	const parts = namespace.split(store.delimiter);
	return parts[parts.length - 1];
}

// from @clubajax/no-dash
function copy (data) {
	if (!data) {
		return data;
	}
	const type = getType(data);
	if (type === 'array') {
		return data.map((item) => {
			if (item && typeof item === 'object') {
				return copy(item);
			}
			return item;
		});
	}

	if (type === 'function' || type === 'html' || type === 'window') {
		return data;
	}

	if (type === 'date') {
		return new Date(data.getTime());
	}

	if (type === 'map') {
		return new Map(data);
	}

	if (type === 'set') {
		return new Set(data);
	}

	if (type === 'object') {
		return Object.keys(data).reduce((obj, key) => {
			const item = data[key];
			if (typeof item === 'object') {
				obj[key] = copy(item);
			} else {
				obj[key] = data[key];
			}
			return obj;
		}, {});
	}
	return data;
}

const global = typeof window !== undefined ? window : global;
function getType (item) {

	if (item === null) {
		return 'null';
	}
	if (typeof item === 'object') {
		if (Array.isArray(item)) {
			return 'array';
		}
		if (item instanceof Date) {
			return 'date';
		}
		if (item instanceof Map) {
			return 'map';
		}
		if (item instanceof Set) {
			return 'set';
		}
		if (item === global) {
			if (typeof window !== undefined) {
				return 'window';
			}
			return 'global';
		}
		if (item.documentElement || item.innerHTML !== undefined) {
			return 'html';
		}
		if(item.length !== undefined && item.callee) {
			return 'arguments'
		}
	}
	if (typeof item === 'number' && isNaN(item)) {
		return 'nan';
	}
	return typeof item;
}

global.logReactStateStore = () => {
	console.log(store.get());
};

export default store;