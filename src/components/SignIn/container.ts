/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Define main interfaces and types for SignIn component.
 * Created function which connect actions
 * and/or variables from the redux-store to the component.
 */

/** External imports */
import { connect } from 'react-redux';

/** Application's imports */
import { fetchSignInAction } from 'store/actionCreators/auth';
import {
    setSignInErrorFieldsToDefaultAction,
    setSignInFieldsMessagesToDefaultAction,
    ISignInErrorFields,
    ISignInFieldsMessages,
} from 'store/slices/auth';
import {
    selectSignInLoading,
    selectSignInErrorFields,
    selectSignInFieldsMessages,
} from 'store/selectors/auth';
import { selectIsLoggedIn } from 'store/selectors/auth';
import { IFetchSignInActionCredentials } from 'utils/verify-credentials';
import { RootState } from 'store/slices';

/** Props which component get from the parent */
interface IOwnProps {}

/** Props which component get from the redux-store */
interface IStateProps {
    isLoggedIn: boolean;
    loading: boolean;
    errorFields: ISignInErrorFields;
    fieldsMessages: ISignInFieldsMessages;
}

/** Props(actions) which component can dispatch */
interface IDispatchProps {
    fetchSignIn: (credentials: IFetchSignInActionCredentials) => void;
    setSignInErrorFieldsToDefault: () => void;
    setSignInFieldsMessagesToDefault: () => void;
}

/** Declare type which describe all props pushed to the component */
export type TSignInProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/** Function which connect variables from the redux-store to component */
const mapStateToProps = (state: RootState): IStateProps => ({
    isLoggedIn: selectIsLoggedIn(state),
    loading: selectSignInLoading(state),
    errorFields: selectSignInErrorFields(state),
    fieldsMessages: selectSignInFieldsMessages(state),
});

/** Function which connect actions to the component */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    fetchSignIn: (credentials: IFetchSignInActionCredentials) =>
        dispatch(fetchSignInAction(credentials)),

    setSignInErrorFieldsToDefault: () =>
        dispatch(setSignInErrorFieldsToDefaultAction()),

    setSignInFieldsMessagesToDefault: () =>
        dispatch(setSignInFieldsMessagesToDefaultAction()),
});

/**
 * Export function which connect actions
 * and/or variables from the redux-store to the component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
