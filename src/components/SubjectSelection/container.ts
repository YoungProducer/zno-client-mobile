/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Define main interfaces and types for SubjectSelection component.
 * Create function which connect actions
 * and/or variables from the redux0store to the component.
 */

/** External imports */
import { connect } from 'react-redux';

/** Application's imports */
import { fetchLogoutAction } from 'store/actionCreators/auth';
import { fetchSubjectsAction } from 'store/actionCreators/subjects';
import {
    selectSubjectsLoading,
    selectSubjectsList,
} from 'store/selectors/subjects';
import { selectIsLoggedIn } from 'store/selectors/auth';
import { RootState, TSubjectList } from 'store/slices';

/** Props which component get from the parent */
interface IOwnProps {}

/** Props which component select from the redux-store */
interface IStateProps {
    loading: boolean;
    subjectsList: TSubjectList;
    loggedIn: boolean;
}

/** Props(actions) which component can dispatch */
interface IDispatchProps {
    fetchSubjectsNames: () => void;
    fetchLogout: () => void;
}

/** Declare type which describe all props pushed to the component */
export type TSubjectSelectionProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/** Create function which connect variables from the redux-store to component */
const mapStateProps = (state: RootState): IStateProps => ({
    loading: selectSubjectsLoading(state),
    subjectsList: selectSubjectsList(state),
    loggedIn: selectIsLoggedIn(state),
});

/** Create function which connect actions to the component */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    fetchSubjectsNames: () => dispatch(fetchSubjectsAction()),
    fetchLogout: () => dispatch(fetchLogoutAction()),
});

/**
 * Export function which connect actions
 * and/or variables from the redux-store to component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateProps,
    mapDispatchToProps,
);
