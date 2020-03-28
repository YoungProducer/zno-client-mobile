/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 22 March 2020
 *
 * Container for TestSuite component.
 * Create function which connect actions and/or
 * variables from the redux-store to the component.
 */

/** External imports */
import { connect } from 'react-redux';

/** Application's imports */
import { fetchTestSuiteAction } from 'store/actionCreators/testSuite';
import { setTestSuiteFinishedAction } from 'store/slices/testSuite';
import {
    selectTestSuiteName,
    selectTestSuiteTasksImages,
    selectTestSuiteExplanationsImages,
    selectAnswers,
    selectTestSuiteFinished,
} from 'store/selectors/testSuite';
import { ITestSuiteCredentials } from 'api';
import { RootState, IAnswer } from 'store/slices';

/** Props which component get from the parent */
interface IOwnProps {}

/** Props which component get from the redux-store */
interface IStateProps {
    answers: IAnswer[];
    name: string;
    tasksImages: string[];
    explanationsImages: string[];
    finished: boolean;
}

/** Props which component can dispatch to redux-store */
interface IDispatchProps {
    fetchTestSuite: (credentials: ITestSuiteCredentials) => void;
    setTestSuiteFinished: (finished: boolean) => void;
}

/** Merged props into root type for current component */
export type TTestSuiteProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/** Map variables from the redux-store */
const mapStateToProps = (state: RootState): IStateProps => ({
    answers: selectAnswers(state),
    name: selectTestSuiteName(state),
    tasksImages: selectTestSuiteTasksImages(state),
    explanationsImages: selectTestSuiteExplanationsImages(state),
    finished: selectTestSuiteFinished(state),
});

/** Map actions which component can dispatch */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    fetchTestSuite: (params: ITestSuiteCredentials) =>
        dispatch(fetchTestSuiteAction(params)),

    setTestSuiteFinished: (finisihed: boolean) =>
        dispatch(setTestSuiteFinishedAction(finisihed)),
});

/**
 * Export function which connect actions and/or
 * variables from the redux-store to the component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
