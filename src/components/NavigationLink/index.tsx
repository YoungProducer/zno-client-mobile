/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 2 March 2020
 *
 * Navigation component to navigates between routes or to another page.
 */

/** External imports */
import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import Link, { LinkProps } from '@material-ui/core/Link';

/** Props for NavigationLink component */
export interface INavigationLinkProps {
    /**
     * Children: text or another tags.
     */
    children: React.ReactNode;
    /**
     * Material link props.
     * If this value is defined component will returns
     * Link component from material which allows to go to another sites or sources.
     */
    link?: LinkProps;
    /**
     * React-router-dom link props.
     * If this value is defined component will returns
     * NavLink component from react-router-dom
     * which allows to swichs between routes defined in Routes component.
     */
    navLink?: NavLinkProps;
    /**
     * Can be as Material UI class or as CSS.
     */
    className?: string;
    /**
     * Attribute for testing.
     */
    'data-testid'?: string;
}

/**
 * Create component.
 *
 * If you provide both props(link and navLink to the component props)
 * component will returns NavLink from react-router-dom.
 */
const NavigationLink = (props: INavigationLinkProps) => {
    const { children, link, navLink, className } = props;

    return (
        <>
            { navLink ?
                <NavLink
                    {...navLink}
                    className={className}
                    data-testid={props["data-testid"] || 'navigation-navlink'}
                >
                    {children}
                </NavLink>
                : <Link
                    {...link}
                    className={className}
                    data-testid={props["data-testid"] || 'navigation-link'}
                >
                    {children}
                </Link>
            }
        </>
    );
};

export default NavigationLink;
