/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 23 March 2020
 *
 * Container for Answer component.
 * Export function which connect actions and/or
 * variables from the redux-store to the component.
 */

/** External imports */
import { connect } from 'react-redux';

/** Application's imports */
import { selectAnswers } from 'store/selectors/testSuite';
import { IAnswer, RootState } from 'store/slices';

/** Props which component get from the parent */
interface IOwnProps {}

/** Props which component select from the redux-store */
interface IStateProps {
    answers: IAnswer[];
}

/** Props which component can dispatch to redux-store */
interface IDispatchProps {}

/** Merged type which describe all props pushed to the component */
export type TAnswerProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/** Function which select variables from the redux-store */
const mapStateToProps = (state: RootState): IStateProps => ({
    answers: selectAnswers(state),
});

/** Function which connect variables from the redux-store to the component */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    null,
);
