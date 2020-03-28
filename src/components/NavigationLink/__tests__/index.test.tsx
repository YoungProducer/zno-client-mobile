/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 2 March 2020
 *
 * Create test suites for NavigationLink component.
 */

/** External imports */
import React from 'react';
import { shallow } from 'enzyme';

/** Application's imports */
import Component, { INavigationLinkProps } from '../index';

describe('NavigationLink component', () => {
    /** Define required props */
    const requiredProps: INavigationLinkProps = {
        children: 'foo',
    };

    test('Is match snapshot', () => {
        /** Render component in shallow via enzyme */
        const root = shallow(<Component {...requiredProps}/>);

        /** Assert component matches snapshot */
        expect(root).toMatchSnapshot();
    });

    test('If link prop has been provided then component should has a Link component inside', () => {
        /** Render component via enzyme */
        const tree = shallow(
            <Component
                {...requiredProps}
                link={{
                    href: 'bar',
                }}
            />,
        );

        /** Assert navLink is not null */
        expect(tree.exists(`[data-testid='navigation-link']`)).toBeTruthy();
    });

    test('If navLink prop has been provided then component should has a NavLink component inside', () => {
        /** Render component via enzyme */
        const tree = shallow(
            <Component
                {...requiredProps}
                navLink={{
                    to: 'bar',
                }}
            />,
        );

        /** Assert navLink is not null */
        expect(tree.exists(`[data-testid='navigation-navlink']`)).toBeTruthy();
    });

    test('If both props have been provided then component should has only a NavLink component', () => {
        /** Render component via enzyme */
        const tree = shallow(
            <Component
                {...requiredProps}
                navLink={{
                    to: 'bar',
                }}
                link={{
                    href: 'foo',
                }}
            />,
        );

        /** Assert navLink is exist and link is not exist */
        expect(tree.exists(`[data-testid='navigation-navlink']`)).toBeTruthy();
        expect(tree.exists(`[data-testid='navigation-link']`)).toBeFalsy();
    });
});
