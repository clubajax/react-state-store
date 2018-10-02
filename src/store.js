
let state = {};
const items = [];

function setState (item, options = {}) {

	const isInit = options.isInit;
	const namespace = options.namespace;

	if (item.instance.state && item.instance.state[key(namespace)] === state[namespace]) {
		console.log('NOCHANGE', key(namespace));
		return;
	}

	const obj = {};
	item.namespaces.forEach((namespace) => {
		obj[key(namespace)] = state[namespace];
	});

	if (isInit) {
		if (item.instance.state) {
			Object.assign(item.instance.state, obj);
		} else {
			item.instance.state = obj;
		}
	} else {
		if (item.instance.updater.isMounted(item.instance)) {
			item.instance.setState(obj);
		} else {
			return true;
		}
	}
	return false;
}

export default {

	set (namespace, value) {
		console.log('set', namespace);

		state[namespace] = value;

		const remove = [];
		items.forEach((item, i) => {
			if (item.namespaces.includes(namespace)) {
				if (setState(item, { namespace })) {
					remove.push(i);
				}
			}
		});

		if (remove.length) {
			console.log('TODO: remove unmounted instances');
		}
	},

	get () {
		return state;
	},

	subscribe (instance, namespaces) {
		items.push({ instance, namespaces: namespaces.split(',').map(str => str.trim()) });
		console.log('item', items[items.length - 1]);
		setState(items[items.length - 1], { isInit: true });
	},

	flush () {
		items.length = 0;
		state = {};
	}
};

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
