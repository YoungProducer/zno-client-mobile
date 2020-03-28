/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Create test suites for routes component.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/** Application's imports */
import Component from '../Component';
import { TRoutesProps } from '../container';
import { RootState } from 'store/slices';
import store from 'store/__mocks__/mockedStore';

describe('Routes component', () => {
    /** Define required props */
    const requiredProps: TRoutesProps = {
        isLoggedIn: false,
    };

    test('Is match snapshot', () => {
        /** Render component in shallow */
        const root = shallow(<Component {...requiredProps}/>);

        /** Assert component matches snapshot */
        expect(root).toMatchSnapshot();
    });
});
