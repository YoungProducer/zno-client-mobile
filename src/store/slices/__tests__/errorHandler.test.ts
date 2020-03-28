/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 21 March 2020
 *
 * Create test suites for error handler slice.
 */

/** External imports */
import { AxiosError } from 'axios';

/** Application's imports */
import errorHandler, {
    setErrorAction,
    IErrorHandlerInitialState,
} from '../errorHandler';

describe('ErrorHandler slice', () => {
    test('setErrorAction with payload should set this payload to state', () => {
        /** Define initial state */
        const initialState = {} as IErrorHandlerInitialState;

        /** Dispatch action and get new state */
        const result = errorHandler(initialState, setErrorAction({
            response: {
                statusText: 'foo',
                status: 401,
            },
            message: 'bar',
        } as AxiosError));

        /** Assert new state has right keys */
        expect(result).toEqual({
            message: 'bar',
            statusCode: 401,
            status: 'foo',
        } as IErrorHandlerInitialState);
    });

    test('setErrorAction without payload should set state to default and statusCode to 200', () => {
        /** Define initial state */
        const initialState: IErrorHandlerInitialState = {
            message: 'foo',
            status: 'bar',
            statusCode: 401,
        };

        /** Dispatch action and get new state */
        const result = errorHandler(initialState, setErrorAction());

        /** Assert new state has default state */
        expect(result).toEqual({
            message: '',
            statusCode: 200,
            status: '',
            data: null,
        } as IErrorHandlerInitialState);
    });
});
