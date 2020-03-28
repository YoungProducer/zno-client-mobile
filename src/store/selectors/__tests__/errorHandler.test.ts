/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 21 March 2020
 *
 * Create test suites for error handler selectors.
 */

/** Application's imports */
import { RootState } from 'store/slices';
import {
    selectErrorStatus,
    selectErrorStatusCode,
    selectErrorMessage,
    selectErrorData,
} from '../errorHandler';

describe('ErrorHandler selectors', () => {
    test('selectErrorStatus with defined property', () => {
        /** Define mocked state */
        const MOCK_STATE =  {
            errorHandler: {
                status: 'foo',
            },
        } as RootState;

        /** Get selector's result */
        const result = selectErrorStatus(MOCK_STATE);

        /** Assert result has right value */
        expect(result).toBe('foo');
    });

    test('selectErrorStatus without defined property', () => {
        /** Define mocked state */
        const MOCK_STATE =  {
            errorHandler: {},
        } as RootState;

        /** Get selector's result */
        const result = selectErrorStatus(MOCK_STATE);

        /** Assert result has right value */
        expect(result).toBe('');
    });

    test('selectErrorStatusCode with defined property', () => {
        /** Define mocked state */
        const MOCK_STATE =  {
            errorHandler: {
                statusCode: 401,
            },
        } as RootState;

        /** Get selector's result */
        const result = selectErrorStatusCode(MOCK_STATE);

        /** Assert result has right value */
        expect(result).toBe(401);
    });

    test('selectErrorStatusCode without defined property', () => {
        /** Define mocked state */
        const MOCK_STATE =  {
            errorHandler: {},
        } as RootState;

        /** Get selector's result */
        const result = selectErrorStatusCode(MOCK_STATE);

        /** Assert result has right value */
        expect(result).toBe(200);
    });

    test('selectErrorMessage with defined property', () => {
        /** Define mocked state */
        const MOCK_STATE =  {
            errorHandler: {
                message: 'bar',
            },
        } as RootState;

        /** Get selector's result */
        const result = selectErrorMessage(MOCK_STATE);

        /** Assert result has right value */
        expect(result).toBe('bar');
    });

    test('selectErrorMessage without defined property', () => {
        /** Define mocked state */
        const MOCK_STATE =  {
            errorHandler: {},
        } as RootState;

        /** Get selector's result */
        const result = selectErrorMessage(MOCK_STATE);

        /** Assert result has right value */
        expect(result).toBe('');
    });

    test('selectErrorData with defined property', () => {
        /** Define mocked state */
        const MOCK_STATE =  {
            errorHandler: {
                data: ['foo'],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectErrorData(MOCK_STATE);

        /** Assert result has right value */
        expect(result).toEqual(['foo']);
    });

    test('selectErrorData without defined property', () => {
        /** Define mocked state */
        const MOCK_STATE =  {
            errorHandler: {},
        } as RootState;

        /** Get selector's result */
        const result = selectErrorData(MOCK_STATE);

        /** Assert result has right value */
        expect(result).toBeNull();
    });
});
