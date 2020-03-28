/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 March 2020
 *
 * Selectors for 'refresh' slice;
 */

/** Application's imports */
import { RootState } from 'store/slices';

export const selectRefreshLoading = (state: RootState) => state.auth.refresh.loading;
