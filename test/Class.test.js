import FauxComponent from './FauxComponent';
import store from '../src/store';
import { shallow } from 'enzyme/build/index';

class One extends FauxComponent {

}

describe.only('Class', () => {

	it('renders without crashing', () => {
		const one = new One({id: 'one'});
		expect(one.id).to.equal('one');
	});

	it('sets state', () => {
		const one = new One({ id: 'one', subscribe: 'one' });
		store.set({ one: 1 });
		expect(one.getState()).to.equal('{"one":1}');
		console.log('one:::', one.getState());
	});

	it('sets state by id', () => {
		const one = new One({ id: 'one', subscribe: 'name' });
		const two = new One({ id: 'two', subscribe: 'name' });
		store.set({ name: "One" }, 'one');
		expect(one.getState()).to.equal('{"name":"One"}');
		expect(two.getState()).to.equal('{}');
		console.log('one:::', one.getState());
		console.log('two:::', two.getState());
	});

});