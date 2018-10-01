import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Foo from '../src/Foo';




describe('A suite', function() {
	it('should render without throwing an error', function() {
		expect(2).to.equal(2);
		// console.log(' -- ', chai.expect(shallow(<Foo />)));

		const wrapper = shallow(<Foo />);
		expect(wrapper).to.contain(<div className="foo">Bar</div>);

	});

	it('should be selectable by class "foo"', function() {
		expect(shallow(<Foo />).is('.foo')).to.equal(true);
	});

	it('should mount in a full DOM', function() {
		expect(mount(<Foo />).find('.foo').length).to.equal(1);
	});

	it('should render to static HTML', function() {
		expect(render(<Foo />).text()).to.equal('Bar');
	});
});