/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 March 2020
 *
 * Create test suites for SubjectSelection component.
 */

/** External imports */
import React from 'react';
import { shallow } from 'enzyme';

/** Application's imports */
import Component from '../Component';
import { TSubjectSelectionProps } from '../container';

/** Mock modules */
jest.mock('react-router-dom', () => ({
    useHistory: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

describe('SubjectSelection component', () => {
    /** Create mock for function */
    const fetchSubjectsNames = jest.fn();
    const fetchLogout = jest.fn();

    /** Define required props */
    const requiredProps: TSubjectSelectionProps = {
        fetchSubjectsNames,
        fetchLogout,
        classes: {
            root: 'root',
        },
        loading: false,
        subjectsList: [{
            id: 'foo',
            name: 'math',
            image: 'bar',
        }],
        loggedIn: false,
    };

    afterEach(() => {
        (requiredProps.fetchSubjectsNames as jest.Mock).mockReset();
    });

    test('Is match snapshot', () => {
        /** Render component in shallow via enzyme */
        const tree = shallow(<Component {...requiredProps}/>);

        /** Assert component matches to snapshot */
        expect(tree).toMatchSnapshot();
    });
});
