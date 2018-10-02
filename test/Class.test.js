import FauxComponent from './FauxComponent';
import store from '../src/store';
import { shallow } from 'enzyme/build/index';


describe.only('Class', () => {
	let removeInstances;
	beforeEach(() => {
		removeInstances = store.removeInstances;
	});
	afterEach(() => {
		store.flush();
		store.removeInstances = removeInstances;
	});

	it('renders without crashing', () => {
		const one = new FauxComponent({ id: 'one' });
		expect(one.id).to.equal('one');
	});

	it('sets state via object', () => {
		const one = new FauxComponent({ subscribe: 'one' });
		store.set({ one: 1 });
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

	it.only('will not set state until mounted', () => {
		let removeCalled = 0;
		store.removeInstances = () => {
			removeCalled++;
		};

		const node = new FauxComponent({ mounted: false, subscribe: 'name' });
		expect(node.getState()).to.equal('{}');
		store.set('name', 'mike');
		expect(node.getState()).to.equal('{}');
		expect(removeCalled).to.equal(0);
		console.log('state', node.getState());
	});

});
