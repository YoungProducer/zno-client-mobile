/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 28 March 2020
 *
 * Container for BottomBar component.
 */

/** External imports */
import { connect } from 'react-redux';

/** Application's imports */
import { selectIsLoggedIn } from 'store/selectors/auth';
import { fetchLogoutAction } from 'store/actionCreators/auth';
import { RootState, setTestSuiteFinishedAction } from 'store/slices';

interface IStateProps {
    loggedIn: boolean;
}

interface IDispatchProps {
    logout: () => void;
    setTestSuiteFinished: (value: boolean) => void;
}

export type TBottomBarProps =
    IStateProps
    & IDispatchProps;

const mapStateToProps = (state: RootState): IStateProps => ({
    loggedIn: selectIsLoggedIn(state),
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    logout: () => dispatch(fetchLogoutAction()),
    setTestSuiteFinished: (finished: boolean) =>
        dispatch(setTestSuiteFinishedAction(finished)),
});

export default connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
);
