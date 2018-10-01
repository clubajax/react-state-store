import { configure } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import jsdom from 'jsdom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());
global.expect = chai.expect;

const {JSDOM} = jsdom;
const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;