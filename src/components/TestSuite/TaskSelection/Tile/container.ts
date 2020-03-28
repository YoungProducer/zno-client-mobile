/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 24 March 2020
 *
 * Container for Tile component.
 * Export functions which connect actions and/or
 * variables from the redux-store to the component.
 */

/** External imports */
import { connect } from 'react-redux';

/** Application's imports */
import { RootState } from 'store/slices';
import {
    selectIsAnswerSelected,
    selectIsAnswerGived,
    selectIsAnswerRight,
    selectTestSuiteFinished,
} from 'store/selectors/testSuite';

/** Props which component get from the parent */
interface IOwnProps {
    taskIndex: number;
    active: boolean;
    /**
     * Function for onClick prop.
     */
    callback: any;
    /**
     * Hide or display tile
     * for optimizing.
     */
    hide: boolean;
}

/** Props which component select from the redux-store */
interface IStateProps {
    selected: boolean;
    gived: boolean;
    right: boolean;
    finished: boolean;
}

/** Props(actions) which component can dispatch to the redux-store */
interface IDispatchProps {}

/** Type which describe all props which will be pushed to the component */
export type TTileProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/** Select variables from the redux-store */
const mapStateToProps = (state: RootState, props: IOwnProps): IStateProps => ({
    selected: selectIsAnswerSelected(state, props),
    gived: selectIsAnswerGived(state, props),
    right: selectIsAnswerRight(state, props),
    finished: selectTestSuiteFinished(state),
});

/** Export function which configure component */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    null,
);
