/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 22 March 2020
 *
 * Create test suites for error handler middleware.
 */

/** Application's imports */
import { errorHandler } from '../errorHandler';
import { setUserDataAction } from 'store/slices/auth';
import { RootState, ISetErrorAction } from 'store/slices';

describe('ErrorHandler middleware', () => {
    /** Create state for mocking */
    const state = {
        errorHandler: {},
        auth: {
            signIn: {
                user: {
                    email: 'foo@gmail.com',
                },
            },
        },
    } as RootState;

    /** Mock next */
    const next = jest.fn();

    /** Create mocked store */
    const store = {
        dispatch: jest.fn(),
        getState: () => state,
    };

    beforeEach(() => {
        next.mockReset();
        store.dispatch.mockReset();
    });

    test('If setErrorAction called with statusCode 401 middleware should dispatch setUserDataAction with null', async () => {
        /** Create stub for action */
        const action = {
            type: 'ErrorHandler/setErrorAction',
            payload: {
                statusCode: 401,
                message: 'foo',
                status: 'Unathorized',
            },
        } as ISetErrorAction;

        await errorHandler(store)(next)(action);
        expect(store.dispatch).toBeCalledWith(setUserDataAction(null));
    });
});
