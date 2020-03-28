/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 March 2020
 *
 * Selectors for logout slice.
 */

/** Application's imports */
import { RootState } from 'store/slices';

export const selectLogoutLoading = (state: RootState) =>
    state.auth.logout.loading;
