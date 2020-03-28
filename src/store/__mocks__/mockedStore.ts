/**
 * Created by: Oleksandr Bezrukov
 * Cretion date: 27 February 2020
 *
 * Create mocked store for async actions testing.
 */

// External imports
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Application's imports
import { RootState } from 'store/slices';

// Define middlewares array
const middlewares = [thunk];

// Create function for creating the mocked store with middlewares
const mockStore = configureMockStore<RootState>(middlewares);

// Create mocked store
const mockedStore = mockStore({
    auth: {
        signUp: {
            loading: false,
            errorFields: {
                email: false,
                password: false,
                confPassword: false,
            },
            fieldsMessages: {
                email: '',
                password: '',
                confPassword: '',
            },
        },
        signIn: {
            loading: false,
            user: null,
            errorFields: {
                email: false,
                password: false,
            },
            fieldsMessages: {
                email: '',
                password: '',
            },
        },
        me: {
            loading: false,
        },
        refresh: {
            loading: false,
        },
        logout: {
            loading: false,
        },
    },
    subjects: {
        loading: false,
        subjectsList: [],
    },
    subjectConfiguration: {
        loading: false,
        dialogVisible: false,
        subjectConfig: null,
    },
    testSuite: {
        loading: false,
        limitTime: false,
        showRightDuringTest: false,
        rightAnswers: [],
        selectedAnswers: [],
        givedAnswers: [],
        tasksImages: [],
        explanationImages: [],
    },
    errorHandler: {},
});

export default mockedStore;
