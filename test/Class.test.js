import FauxComponent from './FauxComponent';
import store from '../src/store';
import { shallow } from 'enzyme/build/index';


describe.only('Class', () => {

	afterEach(() => {
		store.flush();
	});

	it('renders without crashing', () => {
		const one = new FauxComponent({id: 'one'});
		expect(one.id).to.equal('one');
	});

	it('sets state', () => {
		const one = new FauxComponent({ id: 'one', subscribe: 'one' });
		store.set({ one: 1 });
		expect(one.getState()).to.equal('{"one":1}');
	});

	it('sets state by id', () => {
		const one = new FauxComponent({ id: 'one', subscribe: 'name' });
		const two = new FauxComponent({ id: 'two', subscribe: 'name' });
		store.set({ name: "One" }, 'one');
		expect(one.getState()).to.equal('{"name":"One"}');
		expect(two.getState()).to.equal('{}');

		store.set({ name: "Two" }, 'two');
		expect(two.getState()).to.equal('{"name":"Two"}'); // FIXME! Overwrites "name"

		console.log('state', store.get());

	});

	it.only('sets state by namespaces', () => {
		const one = new FauxComponent({ subscribe: 'one.name' });
		const two = new FauxComponent({ subscribe: 'two.name' });
		store.set({ 'one.name': "One" });
		expect(one.getState()).to.equal('{"name":"One"}');
		expect(two.getState()).to.equal('{}');

		store.set({ 'two.name': "Two" });
		expect(two.getState()).to.equal('{"name":"Two"}');

		console.log('one:::', one.getState());
		console.log('two:::', two.getState());
	});

	it.skip('it uses namespaces', () => {

		const one = new FauxComponent({ subscribe: 'foo.bar.name' });
		store.set({
			name: 'mike'
		});

		store.set('foo', true);
		// gets namespace overidden:
		store.set({
			'foo.bar.name': 'mike'
		});
		// blows away foo.bar.name
		store.set('foo', false);

		store.set({
			foo: {
				bar: {
					name: 'mike'
				}
			}
		});
	});

});
