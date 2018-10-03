import store from '../src/store';

describe('store', () => {
	afterEach(() => {
		store.flush();
		store.delimiter = '.';
	});

	it('subscribes to a function', () => {
		// initial state
		store.set('foo', 0);

		const events = [];
		store.subscribe('foo', (value) => {
			events.push(value.foo);
		});

		store.set('foo', 1);
		store.set('foo', 2);
		store.set('foo', 3);
		expect(events.join(',')).to.equal('0,1,2,3');
	});

	it('should unsubscribe', () => {
		store.set('foo', 0);

		const events = [];
		const unsubscribe = store.subscribe('foo', (value) => {
			events.push(value.foo);
		});

		store.set('foo', 1);
		store.set('foo', 2);
		unsubscribe();
		store.set('foo', 3);
		expect(events.join(',')).to.equal('0,1,2');
	});

	it('should toggle using get()', () => {
		store.set('toggle', false);
		const events = [];
		store.subscribe('toggle', (value) => {
			events.push(value.toggle);
		});
		store.set('toggle', !store.get('toggle'));
		store.set('toggle', !store.get('toggle'));
		store.set('toggle', !store.get('toggle'));
		expect(events.join(',')).to.equal('false,true,false,true');
	});

	it('should return a copy of objects', () => {
		store.set('object', {a:1,b:2});
		const o = store.get('object');
		expect(JSON.stringify(o)).to.equal('{"a":1,"b":2}');
		o.a = 3;
		o.b = 4;
		expect(JSON.stringify(store.get('object'))).to.equal('{"a":1,"b":2}');

		store.set('foo', true);
		store.set('bar', false);
		const state = store.get();
		state.foo = 7;
		state.bar = 'nine';
		expect(JSON.stringify(store.get())).to.equal('{"object":{"a":1,"b":2},"foo":true,"bar":false}');
	});

	it('should allow a custom delimiter', () => {
		store.delimiter = '::';
		store.set('namespace::name', 'store');
		store.subscribe('namespace::name', (value) => {
			expect(value.name).to.equal('store');
		});
	});

});