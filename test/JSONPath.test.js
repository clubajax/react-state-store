
describe('JSONPath', () => {
	it.only('should parse', () => {
		const dereferable = {object: 1, function: 1};

		const getProp = (obj, propName) => (obj && dereferable[typeof obj] ? obj[propName] : undefined);

		const getMultiProp = (obj, propName) =>
			obj instanceof Array
				? obj.map(value => getProp(value, propName)).filter(value => typeof value !== 'undefined')
				: obj[propName];

		const getMultiParts = (obj, propNames) => {
			return propNames.reduce((acc, propName) => {
				return getMultiProp(acc, propName);
			}, obj);
		};

		const getMultiPath = (obj, ...names) => {
			const propNames = [];
			names.forEach(name => {
				if (typeof name === 'string') {
					propNames.push(...name.split('.'));
				} else {
					propNames.push(name);
				}
			});
			return getMultiParts(obj, propNames);
		};

		const store = {
			data: [{a: [1, 2]}, {a: [3, 4]}, null, {b: [5, 6]}]
		};

		const result = getMultiPath(store, 'data.a', 1);

		console.log(result);

		store.state = {};
		store.state.data = [
			{ id:'a', name: 'Clark'},
			{ id:'b', name: 'Bruce'},
			{ id:'c', name: 'Diana'},
		];

		getMultiPath(store, 'state.data').filter(obj => obj.id === 'b').forEach(obj => obj.name = 'Superman');

		console.log(getMultiPath(store, 'state.data.name'));
	})
});