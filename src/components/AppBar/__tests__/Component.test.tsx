/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 2 March 2020
 *
 * Create test suites for AppBar component.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { shallow } from 'enzyme';

/** Application's imports */
import Component from '../Component';
import { TAppBarProps } from '../container';

describe('AppBar component', () => {
    /** Define required props */
    const requiredProps: TAppBarProps = {
        classes: {
            root: 'root',
            container: 'container',
            navLink: 'navlink',
        },
    };

    test('Is match snapshot', () => {
        /** Render component in shallow mode via enzyme */
        const root = shallow(<Component {...requiredProps}/>);

        /** Assert component matches snapshot */
        expect(root).toMatchSnapshot();
    });

    test(`Is location equals /subject-selection when click on 'Тести' navlink`, () => {
        /** Create node */
        const root = document.createElement('div');

        /** Append node to the document */
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

        /** Interact with page */
        act(() => {
            /** Find the NavLink */
            const navlink = document.querySelector(`a[data-testid='tests-navlink']`);

            /** Simulate click */
            navlink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        /** Assert pathname equals '/subject-selection' */
        expect(history.location.pathname).toEqual('/subject-selection');
    });

    test(`Is location equals / when click on 'Головна' navlink`, () => {
        /** Create node */
        const root = document.createElement('div');

        /** Append node to the document */
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

        /** Interact with page */
        act(() => {
            /** Find the NavLink */
            const navlink = document.querySelector(`a[data-testid='home-navlink']`);

            /** Simulate click */
            navlink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        /** Assert pathname equals '/' */
        expect(history.location.pathname).toEqual('/');
    });
});
