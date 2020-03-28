/**
 * Created by: Oleksandr Bezrukov
 * Craetion date: 24 March 2020
 *
 * Container for TaskActions component.
 * Export function which connect actions and/or variables
 * from the redux-store to the component.
 */

/** External imports */
import { connect } from 'react-redux';

/** Application's imports */
import { RootState } from 'store/slices';
import {
    selectAnswers,
    selectIsAnswerGived,
    selectIsAnswerSelected,
} from 'store/selectors/testSuite';
import {
    giveAnswerByIndexAction, IAnswer,
} from 'store/slices/testSuite';

/** Props which component get from the parent */
interface IOwnProps {
    /**
     * Index of task which is selected.
     */
    taskIndex: number;
    /**
     * If explanation image exists should be true.
     */
    explanationExists: boolean;
    showExplanation: boolean;
    toggleExplanation: (show: boolean) => void;
    setTaskIndex: (index: number) => void;
}

/** Props which component select from the redux-store */
interface IStateProps {
    answers: IAnswer[];
    selected: boolean;
    gived: boolean;
}

/** Props(actions) which component can dispatch to redux-store */
interface IDispatchProps {
    giveAnswer: (index: number) => void;
}

/** Type which describe all props which will be pushed to the component. */
export type TTaskActionsProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/** Function which select variables from the redux-store */
const mapStateToProps = (state: RootState, props: IOwnProps): IStateProps => ({
    answers: selectAnswers(state),
    gived: selectIsAnswerGived(state, props),
    selected: selectIsAnswerSelected(state, props),
});

/** Function which wrap actions into dispatch */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    giveAnswer: (index: number) => dispatch(giveAnswerByIndexAction(index)),
});

/** Export function which confgiure component */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
