/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 7 March 2020
 *
 * Define main types and interfaces for App component.
 * Connect actions and variables from the redux-store to the component.
 * Export configured component via HOC.
 */

/** External imports */
import React from 'react';
import { connect } from 'react-redux';

/** Application's imports */
import { fetchMeAction } from 'store/actionCreators/auth';
import App from '../App';

/** Props(actions) which component can disaptch */
interface IDispatchProps {
    fetchMe: () => void;
}

/** Type which describe all props pushed to the component */
export type TAppProps = IDispatchProps;

/** Connect actions to the component */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    fetchMe: () => dispatch(fetchMeAction()),
});

/** Export configured component */
export default connect<{}, IDispatchProps>(
    null,
    mapDispatchToProps,
)(App);
