let state = {};
const items = [];

function setState (item, { id, isInit }) {
	if (id && item.instance.id !== id) {
		return;
	}
	const obj = {};
	item.props.forEach((prop) => {
		obj[prop] = state[prop];
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
	set (obj, id) {
		console.log('items', obj, items.length);
		Object.assign(state, obj);
		const remove = [];
		items.forEach((item, i) => {
			if (setState(item, { id })) {
				remove.push(i);
			}
		});

		// remove unmounted instances
	},
	get () {
		return state;
	},
	subscribe (instance, props) {
		items.push({ instance, props: props.split(',').map(str => str.trim()) });

		setState(items[items.length-1], { isInit: true });
	},
	flush () {
		items.length = 0;
		state = {};
	}
};

// √ react-state-store
// new Store() - ?
// channels? Don't keep state?
// -> state is still a good idea, if it is set before init
//		this prevents race conditions
//		'foo.bar.name' <- sets state.name [foo.bar] <- channel name
// √ instances? need chart example?
// still want to setState under the hood
// store.on(this, '
// foo.name,
// bar.name
// ', this.id)
// ->
// store.set(state, this.id);
//
// is there an issue with state vs prop, namely an interception?
// intercept:
// store.on('foo.bar', (state) => { return change-of-state });
