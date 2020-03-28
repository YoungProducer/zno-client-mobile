/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Create test suites for SubjectSelection route.
 */

/** External imports */
import React from 'react';
import { shallow } from 'enzyme';

/** Application's imports */
import Component from '../index';

describe('SubjectSelection route', () => {
    test('Is match snapshot', () => {
        /** Render via enzyme */
        const root = shallow(<Component />);

        /** Assert component matches snapshot */
        expect(root).toMatchSnapshot();
    });
});
