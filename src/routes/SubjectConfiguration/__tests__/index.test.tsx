/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 6 March 2020
 *
 * Create test suites for SubjectConfiguration route.
 */

/** External imports */
import React from 'react';
import { shallow } from 'enzyme';

/** Application's imports */
import Component from '../index';

describe('SubjectConfiguration route', () => {
    test('Is match snapshot', () => {
        /** Render via enzyme */
        const tree = shallow(<Component />);

        /** Assert component matches snapshot */
        expect(tree).toMatchSnapshot();
    });
});
