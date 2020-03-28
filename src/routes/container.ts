/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Declare main interfaces and types for routes component.
 * Define function which connect actions
 * and/or variables from the redux-store to the component.
 */

/** External imports */
import { connect } from 'react-redux';

/** Application's imports */
import { selectIsLoggedIn } from 'store/selectors/auth';
import { RootState } from 'store/slices';

/** Props which component get from the parent */
interface IOwnProps {}

/** Props which component select from the redux-store */
interface IStateProps {
    isLoggedIn: boolean;
}

/** Props(actions) which component can dispatch */
interface IDispatchProps {}

/** Declare type which describe all props pushed to the component */
export type TRoutesProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/** Create function which select variables from the redux-store and connect them to the component */
const mapStateToProps = (state: RootState): IStateProps => ({
    isLoggedIn: selectIsLoggedIn(state),
});

/** Export function which create configured HOC */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
);
