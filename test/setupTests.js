import { configure } from 'enzyme';
import chaiEnzyme from 'chai-enzyme'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import chai from 'chai';
chai.use(chaiEnzyme());
global.expect = chai.expect;