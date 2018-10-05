import Component from './FauxComponent';
import store from '../src/store';

describe('Class', () => {
	afterEach(() => {
		store.flush();
	});

	it('renders without crashing', () => {
		const one = new Component({ id: 'one' });
		expect(one.id).to.equal('one');
	});

	it('sets state via object', () => {
		const one = new Component({ subscribe: 'one' });
		store.set({ one: 1 });
		one.mount();
		expect(one.getState()).to.equal('{"one":1}');
	});

	it('sets state by namespaces', () => {
		const one = new Component({ subscribe: 'one.name' });
		const two = new Component({ subscribe: 'two.name' });
		store.set('one.name', "One");
		expect(one.getState()).to.equal('{"name":"One"}');
		expect(two.getState()).to.equal('{}');

		store.set('two.name', "Two");
		expect(two.getState()).to.equal('{"name":"Two"}');
	});

	it('it will not call setState if no change', () => {

		let stateCalled = 0;
		const one = new Component({
			subscribe: 'name',
			setStateCallback: () => {
				stateCalled++;
			}
		});
		one.mount();

		store.set('name', 'mike');
		store.set('name', 'mike');
		expect(stateCalled).to.equal(1);

		store.set({
			name: 'mike',
			age: 21
		});
		expect(stateCalled).to.equal(1);

		store.set({
			name: 'madhu',
			age: 22
		});
		expect(stateCalled).to.equal(2);
	});

	it('will not set state if unmounted', () => {
		const node = new Component({ mounted: false, subscribe: 'name' });
		expect(node.getState()).to.equal('{}');
		store.set('name', 'mike');
		expect(node.getState()).to.equal('{"name":"mike"}');
		node.unmount();
		store.set('name', 'madhu');
		expect(node.getState()).to.equal('{"name":"mike"}');
	});

	it('should subscribe to instances', () => {

		const n1 = new Component({ subscribe: '{{id}}.name', id: 'buzz' });
		const n2 = new Component({ subscribe: '{{id}}.name', id: 'bazz' });

		store.set({
			'buzz.name': 'fly',
			'bazz.name': 'bee'
		});

		expect(n1.getState()).to.equal('{"name":"fly"}');
		expect(n2.getState()).to.equal('{"name":"bee"}');
	});

	it('should get data from an array by id', () => {
		const data = [
			{ id:1, name: 'Clark'},
			{ id:2, name: 'Bruce'},
			{ id:3, name: 'Diana'},
		];

		store.set({ data });

		const n1 = new Component({ subscribe: 'data[id].name', id: 1 });
		const n2 = new Component({ subscribe: 'data[id].name', id: 2 });
		const n3 = new Component({ subscribe: 'data[id].name', id: 3 });


		//const n3 = new Component({ subscribe: 'data[id].name', id: 3 });

		// need
		// store.set('data[id:1].name', 'Superman')
		// store.set('data[id::1].name', 'Superman')
		// store.set('data[id=1].name', 'Superman')
		// store.set('data[1].name', 'Superman') // index - is this ever used?
		// store.state.data.find(item = item.id === id)
		// store.set('select from data where id='b', 'Superman')
		// <- and as object
		//
		// CSSPath
		// store.get('.data #b [name]')
		// store.get('.data [value="b"] [name]')
		// convert:
		// subscribe data[id].name
	});

// store.set('data[id:1].name', 'Superman')
// store.set('data[id::1].name', 'Superman')
// store.set('data[id=1].name', 'Superman')

	// before import store
	// localStorage.REACT_STATE_STORE_KEY = 'saved_data'
	// or
	// store.REACT_STATE_STORE_KEY = 'saved_data';
	// store.save to localStorage

	// store.on

	// case types.ARCHIVE_PROJECT:
	// case types.RESTORE_PROJECT:
});
