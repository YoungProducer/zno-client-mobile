/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Create history.
 */

/** External imports */
import { createBrowserHistory } from 'history';

const mode = process.env.NODE_ENV;
const basename = mode === 'development'
    ? '/'
    : '/zno/m';

/** Create browser history */
const history = createBrowserHistory({
    basename,
});

/** Export history */
export default history;
