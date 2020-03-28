/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 7 March 2020
 *
 * Create test suites for custom Input component.
 */

/** External imports */
import React from 'react';
import { shallow } from 'enzyme';

/** Application's imports */
import Component, { TInputBaseProps } from '../index';

describe('Input component', () => {
    /** Define required props */
    const requiredProps: TInputBaseProps = {};

    /** Define non-required props */
    const props: TInputBaseProps = {
        helperText: 'foo',
    };

    test('Is match snapshot', () => {
        /** Render component */
        const tree = shallow(<Component {...requiredProps} {...props}/>);

        /** Assert component matches snapshot */
        expect(tree).toMatchSnapshot();
    });
});
