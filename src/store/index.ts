/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Configure store and apply middlewares.
 */

// External impors
import {
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { History } from 'history';

// Application's imports
import rootReducer from './slices';
import middlewares from './middlewares';
import testState from './testState';
import history from 'routes/history';

export interface ThunkExtractArgument {
    history: History<{}>;
}

const createStore = () => {
    /** Extract env variable */
    const production = process.env.NODE_ENV === 'production';
    const development = process.env.NODE_ENV === 'development';

    const useTestState: string = process.env.REACT_USE_TEST_STATE || 'false';

    /** Define middlewares */
    const defaultMiddleware = getDefaultMiddleware({
        thunk: {
            extraArgument: {
                history,
            },
        },
        serializableCheck: true,
        immutableCheck: true,
    });

    const logger = !production
        ? require('redux-logger').createLogger({
            collapsed: true,
            diff: true,
        })
        : undefined;

    /**
     * Init preloaded state.
     * If useTestState equals true load testState
     * in other case set preloadedState as undefined.
     */
    const preloadedState = useTestState === 'true' ? testState : undefined;

    const middleware = production
        ? [...defaultMiddleware, ...middlewares]
        : [...defaultMiddleware, logger, ...middlewares];

    return configureStore({
        middleware,
        preloadedState,
        reducer: rootReducer,
    });
};

/** Create store */
const store = createStore();

export type AppDispatch = typeof store.dispatch;

export type Store = typeof store;

export default store;
