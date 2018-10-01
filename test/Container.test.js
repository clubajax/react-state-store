import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import Container from '../src/components/Container';
import Buttons from '../src/components/Buttons';
import DisplayOne from '../src/components/DisplayOne';
import DisplayTwo from '../src/components/DisplayTwo';
import List from '../src/components/List';

describe('Container', () => {

	it('renders without crashing', () => {
		const wrapper = shallow(<Container />);
	});

	it('has children', () => {
		const wrapper = mount(<Container />);
		expect(wrapper.find(DisplayOne)).to.have.lengthOf(0);
		expect(wrapper.find(DisplayTwo)).to.have.lengthOf(0);
		const list = wrapper.find(List).instance();

		expect(list.state.one).to.equal(undefined);
		expect(list.state.two).to.equal(undefined);

		console.log('list::::::::', list.state); // .state()

		const uno = wrapper.find('button').at(0);
		const dos = wrapper.find('button').at(1);

		uno.simulate('click');
		dos.simulate('click');

		expect(list.state.one).to.equal(true);
		expect(list.state.two).to.equal(true);

		expect(wrapper.find(DisplayOne)).to.have.lengthOf(1);
		expect(wrapper.find(DisplayTwo)).to.have.lengthOf(1);

		console.log('FIND', wrapper.find(DisplayOne).length);


	});

});
