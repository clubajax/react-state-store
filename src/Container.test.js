import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import Container from './components/Container';

it('renders without crashing', () => {

	const cmp = shallow(<Container />);

	console.log('cmp', cmp);

  // const div = document.createElement('div');
  // ReactDOM.render(<Container />, div);
  // ReactDOM.unmountComponentAtNode(div);
});
