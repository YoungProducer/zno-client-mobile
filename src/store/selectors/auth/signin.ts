/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 28 February 2020
 *
 * Selectors for singIn slice.
 */

/** External imports */
import { createSelector } from '@reduxjs/toolkit';

/** Application's imports */
import { RootState } from 'store/slices';

export const selectSignInLoading = (state: RootState) =>
    state.auth.signIn.loading;

export const selectSignInUser = (state: RootState) =>
    state.auth.signIn.user;

export const selectSignInErrorFields = (state: RootState) =>
    state.auth.signIn.errorFields;

export const selectSignInFieldsMessages = (state: RootState) =>
    state.auth.signIn.fieldsMessages;

/**
 * Select is user logged in.
 * If user not null returns true in other case returns false.
 */
export const selectIsLoggedIn = createSelector(
    selectSignInUser,
    (user) => user !== null,
);
