import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import Container from '../src/components/Container';
import Buttons from '../src/components/Buttons';

describe('Container', () => {
	it('renders without crashing', () => {
		const wrapper = shallow(<Container />);
	});
	it('has children', () => {
		const wrapper = shallow(<Container />);

		// expect(instance).to.be.an.instanceof(Buttons);

		// expect(wrapper).to.contain(<Buttons />);
	});

});
