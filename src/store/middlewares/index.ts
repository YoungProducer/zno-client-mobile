/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 21 March 2020
 *
 * Entry point of store midllewares.
 * Export array of custom middlewares.
 */

/** Application's imports */
import { errorHandler } from './errorHandler';

export default [
    errorHandler,
];
