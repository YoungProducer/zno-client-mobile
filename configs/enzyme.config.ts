/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 13 February 2020
 *
 * Create Adapter for React.
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
