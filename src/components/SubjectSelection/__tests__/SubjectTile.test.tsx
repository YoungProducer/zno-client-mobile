/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Create test suites for SubjectTile component.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { shallow } from 'enzyme';

/** Application's imports */
import Component, { ISubjectTileProps } from '../SubjectTile';

/** Create mock function for useHistory hook */
const push = jest.fn();

/** Mock react-router-dom module */
jest.mock('react-router-dom', () => ({
    useHistory: jest.fn(() => ({
        push,
    })),
}));

describe('SubjectTile component', () => {
    /** Define required props */
    const requiredProps: ISubjectTileProps = {
        subject: {
            id: 'foo',
            name: 'bar',
        },
    };

    test('Is match snapshot', () => {
        /** Render via enzyme */
        const root = shallow(<Component {...requiredProps} />);

        /** Assert component matches snapshot */
        expect(root).toMatchSnapshot();
    });

    test('Button onClick handler', () => {
        /** Render via enzyme */
        const tree = shallow(<Component {...requiredProps}/>);

        /** Simulate */
        tree.find(`[data-testid='subject-tile-button']`).simulate('click');

        expect(push).toHaveBeenCalledWith('/subject-configuration/foo');
    });
});
