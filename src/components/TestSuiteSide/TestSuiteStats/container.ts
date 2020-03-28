/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 March 2020
 *
 * Container for TestSuiteStats component.
 * Export function which connect actions and select
 * variables from the redux-store to the component.
 */

/** External imports */
import { connect } from 'react-redux';

/** Application's imports */
import { setTestSuiteFinishedAction } from 'store/slices/testSuite';
import {
    selectAmountOfSelectedAnswers,
    selectAmountOfGivedAnswers,
    selectAmountOfRightAnswers,
    selectAnswersAmount,
    selectTestSuiteFinished,
    selectMaxAmountOfPoints,
    selectCurrentAmountOfPoints,
} from 'store/selectors/testSuite';
import { RootState } from 'store/slices';

/** Props which component get from the parent */
interface IOwnProps {}

/** Props which component select from the redux-store */
interface IStateProps {
    finished: boolean;
    amountOfSelected: number;
    amountOfGived: number;
    amountOfRight: number;
    answersAmount: number;
    currentAmountOfPoints: number;
    maxAmountOfPoints: number;
}

/** Props which component can dispatch to the redux-store */
interface IDispatchProps {
    setTestSuiteFinished: (finished: boolean) => void;
}

/** Type which describe all props pushed to the component */
export type TTestSuiteStatsProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/** Select variables from the redux-store */
const mapStateToProps = (state: RootState): IStateProps => ({
    finished: selectTestSuiteFinished(state),
    amountOfSelected: selectAmountOfSelectedAnswers(state),
    amountOfGived: selectAmountOfGivedAnswers(state),
    amountOfRight: selectAmountOfRightAnswers(state),
    answersAmount: selectAnswersAmount(state),
    currentAmountOfPoints: selectCurrentAmountOfPoints(state),
    maxAmountOfPoints: selectMaxAmountOfPoints(state),
});

/** Return functions wrapped into dispatch */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    setTestSuiteFinished: (finished: boolean) =>
        dispatch(setTestSuiteFinishedAction(finished)),
});

/** Export function which configure component */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
