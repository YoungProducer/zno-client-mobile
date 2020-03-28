/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Create test suites for PrivateRoute component.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

/** Application's imports */
import Component from '../Component';
import { TPrivateRoute } from '../container';

describe('PrivateRoute component', () => {
    /** Define required props */
    const requiredProps: TPrivateRoute = {
        isLoggedIn: false,
        children: <div />,
        path: '/',
        exact: true,
    };

    test('Is match snapshot', () => {
        /** Render component in shallow */
        const root = shallow(<Component {...requiredProps}/>);

        /** Assert component matches snapshot */
        expect(root).toMatchSnapshot();
    });

    test('Check location if user is not logged in', () => {
        /** Create node */
        const root = document.createElement('div');

        /** Append node to body */
        document.body.appendChild(root);

        /** Create history */
        const history = createMemoryHistory();

        /** Render via react-dom */
        render(
            <Router history={history}>
                <Component {...requiredProps}/>
            </Router>,
            root,
        );

        /** Assert pathname equals '/auth/signin' */
        expect(history.location.pathname).toEqual('/auth/signin');
    });

    test('Check location if user is logged in', () => {
        /** Create node */
        const root = document.createElement('div');

        /** Append node to body */
        document.body.appendChild(root);

        /** Create history */
        const history = createMemoryHistory();

        /** Render via react-dom */
        render(
            <Router history={history}>
                <Component {...requiredProps} isLoggedIn={true}/>
            </Router>,
            root,
        );

        /** Assert pathname equals '/' */
        expect(history.location.pathname).toEqual('/');
    });
});
