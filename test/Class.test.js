import FauxComponent from './FauxComponent';
import store from '../src/store';

describe('Class', () => {
	afterEach(() => {
		store.flush();
	});

	it('renders without crashing', () => {
		const one = new FauxComponent({ id: 'one' });
		expect(one.id).to.equal('one');
	});

	it('sets state via object', () => {
		const one = new FauxComponent({ subscribe: 'one' });
		store.set({ one: 1 });
		one.mount();
		expect(one.getState()).to.equal('{"one":1}');
	});

	it('sets state by namespaces', () => {
		const one = new FauxComponent({ subscribe: 'one.name' });
		const two = new FauxComponent({ subscribe: 'two.name' });
		store.set('one.name', "One");
		expect(one.getState()).to.equal('{"name":"One"}');
		expect(two.getState()).to.equal('{}');

		store.set('two.name', "Two");
		expect(two.getState()).to.equal('{"name":"Two"}');
	});

	it('it will not call setState if no change', () => {

		let stateCalled = 0;
		const one = new FauxComponent({
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
		const node = new FauxComponent({ mounted: false, subscribe: 'name' });
		expect(node.getState()).to.equal('{}');
		store.set('name', 'mike');
		expect(node.getState()).to.equal('{"name":"mike"}');
		node.unmount();
		store.set('name', 'madhu');
		expect(node.getState()).to.equal('{"name":"mike"}');
	});

	it.skip('should do these things in the future', () => {
		store.set({
			'one.name': 'madhu',
			'two.name': 'madhu'
		});

		store.on('two.name', (data) => {
			data += changes;
			return data;
		});

		// appends to static Class namespaces
		// if props.instanceNamespaces

		// possible different delimiter:
		// refer to GraphQL
		// connect('one::key,two::key', List);

		// need a way to track the state, like redux
		// window.reactStateStore.log()

		// store.save to localStorage

		// case types.ARCHIVE_PROJECT:
		// case types.RESTORE_PROJECT:


	})

});
