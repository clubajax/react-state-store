
// `isMounted` has been deprecated for years. Chances are it will not be removed
// if it is, one possibility is to overwrite componentDidMount & componentWillUnmount
//
export default {

	set (namespace, value) {

		if (typeof namespace === 'object') {
			Object.assign(state, namespace);	
		} else {
			state[namespace] = value;
		}
		
		const toBeRemoved = [];
		items.forEach((item, i) => {
			if (includes(item, namespace)) {
				if (setState(item, { namespace })) {
					toBeRemoved.push(i);
				}
			}
		});

		if (toBeRemoved.length) {
			this.removeInstances(toBeRemoved);
		}
	},

	removeInstances (indicies) {
		console.log('remove unmounted instances', indicies);
		indicies.reverse().forEach((index) => {
			this.unsubscribe(items[index]);
		});
	},

	get () {
		return state;
	},

	subscribe (instance, namespaces) {
		const unmount = instance.componentWillUnmount;
		const mount = instance.componentDidMount;
		items.push({
			instance,
			namespaces: namespaces.split(',').map(str => str.trim()),
			restore () {
				instance.componentWillUnmount = unmount;
				instance.componentDidMount = mount;
			}
		});
		setState(items[items.length - 1], { isInit: true });
	},

	unsubscribe (instance) {
		const index = items.findIndex(item => item.instance === instance);
		if (index === -1) {
			console.log('instance NO FOUND');
			return;
		}
		items[index].restore();
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

	const isInit = options.isInit;
	const namespace = options.namespace;

	if (item.instance.state && noChanges(item, namespace)) {
		return;
	}

	const stateForInstance = {};
	item.namespaces.forEach((ns) => {
		stateForInstance[key(ns)] = state[ns];
	});

	if (isInit) {
		if (item.instance.state) {
			Object.assign(item.instance.state, stateForInstance);
		} else {
			item.instance.state = stateForInstance;
		}
	} else {
		if (item.instance.updater.isMounted(item.instance)) {
			item.instance.setState(stateForInstance);
		} else {
			return true;
		}
	}
	return false;
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

// √ react-state-store

// new Store() - ?
// 		no - makes it less simple

// Don't keep state?
// -> state is still a good idea, if it is set before init
//		this prevents race conditions

// namespaces?
//		'foo.bar.name' <- sets state.name [foo.bar] <- channel name

// √ instances?
// FIXME! Overwrites "name"
// still want to setState under the hood
// store.on(this, '
// foo.name,
// bar.name
// ', this.id)
// ->
// store.set(state, this.id);
//
// is there an issue with state vs namespace, namely an interception?
// intercept:
// store.on('foo.bar', (state) => { return change-of-state });
