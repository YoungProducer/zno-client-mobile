/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 27 February 2020
 *
 * Create function which connect actions
 * and/or variables from the redux-store to the component.
 */

// External imports
import { connect } from 'react-redux';

// Application's imports
import { fetchSignUpAction } from 'store/actionCreators/auth/signup';
import {
    setSignUpErrorFieldsToDefaultAction,
    setSignUpFieldsMessagesToDefaultAction,
    ISignUpErrorFields,
    ISignUpFieldsMessages,
} from 'store/slices/auth';
import {
    selectSignUpLoading,
    selectSignUpErrorFields,
    selectSignUpFieldsMessages,
} from 'store/selectors/auth';
import { IFetchSignUpActionCredentials } from 'utils/verify-credentials';
import { RootState } from 'store/slices';

/**
 * Props which component get from the parent.
 */
interface IOwnProps {}

/**
 * Props which component get from the redux-store.
 */
interface IStateProps {
    loading: boolean;
    errorFields: ISignUpErrorFields;
    fieldsMessages: ISignUpFieldsMessages;
}

/**
 * Props(actions) which component can dispatch.
 */
interface IDispatchProps {
    fetchSignUp: (credentials: IFetchSignUpActionCredentials) => void;
    setSignUpErrorFieldsToDefault: () => void;
    setSignUpFieldsMessagesToDefault: () => void;
}

/**
 * Export type which describe all props pushed to the component.
 */
export type TSignUpProps = IOwnProps & IStateProps & IDispatchProps;

/**
 * Connect variables from the store to component.
 */
const mapStateToProps = (state: RootState): IStateProps => ({
    loading: selectSignUpLoading(state),
    errorFields: selectSignUpErrorFields(state),
    fieldsMessages: selectSignUpFieldsMessages(state),
});

/**
 * Connect actions which component must dispatch.
 */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    fetchSignUp: (credentials: IFetchSignUpActionCredentials) =>
        dispatch(fetchSignUpAction(credentials)),

    setSignUpErrorFieldsToDefault: () =>
        dispatch(setSignUpErrorFieldsToDefaultAction()),

    setSignUpFieldsMessagesToDefault: () =>
        dispatch(setSignUpFieldsMessagesToDefaultAction()),
});

// Export function which connect acions and/or variables from the redux-store to the component.
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
