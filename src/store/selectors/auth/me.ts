/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 March 2020
 *
 * Selectors for 'me' slice;
 */

/** Application's imports */
import { RootState } from 'store/slices';

export const selectMeLoading = (state: RootState) => state.auth.me.loading;
