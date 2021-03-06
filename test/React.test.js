import React from 'react';
import { shallow, mount } from 'enzyme';
import Container from '../src/components/Container';
import DisplayOne from '../src/components/DisplayOne';
import DisplayTwo from '../src/components/DisplayTwo';
import List from '../src/components/List';
import InstanceTest from '../src/components/InstanceTest';
import store from '../src/store';

describe('React', () => {

	it('renders without crashing', () => {
		const wrapper = shallow(<Container />);
	});

	it('will change state on a React component', () => {
		const wrapper = mount(<Container />);
		const list = wrapper.find(List).instance();
		const uno = wrapper.find('button').at(0);
		const dos = wrapper.find('button').at(1);

		expect(wrapper.find(DisplayOne)).to.have.lengthOf(0);
		expect(wrapper.find(DisplayTwo)).to.have.lengthOf(0);
		expect(list.state.one).to.equal(undefined);
		expect(list.state.two).to.equal(undefined);

		uno.simulate('click');
		dos.simulate('click');

		expect(list.state.one).to.equal(true);
		expect(list.state.two).to.equal(true);
		expect(wrapper.find(DisplayOne)).to.have.lengthOf(1);
		expect(wrapper.find(DisplayTwo)).to.have.lengthOf(1);
		wrapper.unmount();
		store.flush();
	});

	it('will initialize state on a React component', () => {
		const wrapper = mount(<Container />);
		const list = wrapper.find(List).instance();
		const b1 = wrapper.find('button').at(0);
		const b2 = wrapper.find('button').at(1);
		const i1 = wrapper.find('input').at(0);
		const i2 = wrapper.find('input').at(1);

		i1.simulate('change', {target:{value: 'abc'}});
		b1.simulate('click');

		expect(wrapper.find(List).find('div').at(1).text()).to.equal('Display One abc');

		wrapper.unmount();
		store.flush();
	});

	it('will set state React component instances', () => {
		const wrapper = mount(<Container />);
		const list = wrapper.find(List).instance();

		const node1 = wrapper.find(InstanceTest).at(0);
		const node2 = wrapper.find(InstanceTest).at(1);
		const node3 = wrapper.find(InstanceTest).at(2);

		const btn = wrapper.find('button.for-instance');

		expect(node1.text()).to.equal('Instance Test ');
		expect(node2.text()).to.equal('Instance Test ');
		expect(node3.text()).to.equal('Instance Test ');

		btn.simulate('click');

		expect(node1.text()).to.equal('Instance Test NAME-A');
		expect(node2.text()).to.equal('Instance Test NAME-B');
		expect(node3.text()).to.equal('Instance Test NAME-C');

		wrapper.unmount();
		store.flush();
	});
});
