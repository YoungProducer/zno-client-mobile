/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create selectors for signUp slice.
 */

// Application's imports
import { RootState } from 'store/slices';

export const selectSignUpLoading = (state: RootState) => state.auth.signUp.loading;

export const selectSignUpErrorFields = (state: RootState) => state.auth.signUp.errorFields;

export const selectSignUpFieldsMessages = (state: RootState) => state.auth.signUp.fieldsMessages;
