/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Define main types and interface related to PrivateRoute component.
 * Create function which connect variables from the redux store.
 */

/**External imports */
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router-dom';

// Applicaiton's imports
import { selectIsLoggedIn } from 'store/selectors/auth/signin';
import { RootState } from 'store/slices';

/**
 * Props which component get from the parent component.
 */
interface IOwnProps extends RouteProps {
    children: ReactNode;
}

/**
 * Props which component get from the redux store.
 */
interface IStateProps {
    isLoggedIn: boolean;
}

/**
 * Declare type which describe all props pushed to the component.
 */
export type TPrivateRoute =
    IOwnProps
    & IStateProps;

/**
 * Define function mapStateToProps.
 * Function select variables from the redux store.
 */
const mapStateToProps = (state: RootState): IStateProps => ({
    isLoggedIn: selectIsLoggedIn(state),
});

/**
 * Export function which connect actions
 * or/and variables from the redux store to component.
 */
export default connect<IStateProps, {}, IOwnProps>(
    mapStateToProps,
);
