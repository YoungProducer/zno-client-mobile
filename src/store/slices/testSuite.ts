/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 20 March 2020
 *
 * Slice which handle different types of answers and test suites.
 * In future should display online progress(how many answers are gived right
 * and how many answers have been gived).
 */

/** External imports */
import { createSlice } from '@reduxjs/toolkit';

/** Application's imports */
import { ILoadingAction } from 'store/types';
import { TAnswerType, IAnswerFromResponse } from 'api';

/** Declare interface for actions and payloads */
interface IShowRightDuringTestAction {
    payload: boolean;
}

interface ILimitTestSuiteTimeAction {
    payload: boolean;
}

/** This interface for tasks and explanations images */
interface ISetTestSuiteImagesAction {
    payload: string[];
}

interface ISetAnswersActions {
    payload: IAnswer[];
}

export interface ISetAnswerByIdPreparePayload {
    id: number;
    answer?: string;
    answerIndex?: number;
}

export interface ISetAnswerByIdPayload {
    answer: string;
    /**
     * Task index.
     */
    id: number;
    /**
     * Answer index.
     * Index of element in answer array.
     * [['foo', 'bar']] => index = 1 => 'bar'
     */
    answerIndex: number;
}

interface ISetAnswerByIdAction {
    payload: ISetAnswerByIdPayload;
}

interface IGiveAnswerByIdAction {
    payload: number;
}

interface ISetTestSuiteNameAction {
    payload: string;
}

export interface ISetTestSuiteNamePreparePayload {
    theme?: string;
    session?: string;
    training?: string;
}

interface ISetTestSuiteFinishedAction {
    payload: boolean;
}

/**  */
export interface IAnswer {
    type: TAnswerType;
    /**
     * Right answers.
     */
    right: string[];
    /**
     * Selected answers.
     * Just selected not gived
     * it means that user can change anywhen.
     */
    selected: string[];
    /**
     * Gived answers.
     * If answers passed to this array
     * app will show user is his answer is right.
     */
    gived: string[];
}

/** Declare interface for initial state */
export interface ITestSuiteInitialState {
    /**
     * This variable should display when images and right answers
     * are downloaded.
     */
    loading: boolean;
    /**
     * Condition of tasks.
     */
    tasksImages: string[];
    /**
     * Explanation for tasks.
     */
    explanationImages: string[];
    answers: IAnswer[];
    /**
     * It could be name of theme, session or training variant.
     */
    name: string;
    finished: boolean;
}

/** Create initial state */
const initialState: ITestSuiteInitialState = {
    loading: false,
    tasksImages: [],
    explanationImages: [],
    answers: [],
    name: '',
    finished: false,
};

/** Create slice */
const testSuite = createSlice({
    initialState,
    name: 'TestSuite',
    reducers: {
        /**
         * Toggles loading property.
         */
        testSuiteLoadingAction: (
            state: ITestSuiteInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loading: payload,
        }),
        setTestSuiteFinishedAction: (
            state: ITestSuiteInitialState,
            { payload }: ISetTestSuiteFinishedAction,
        ) => ({
            ...state,
            finished: payload,
        }),
        /**
         * Set name of current test suite.
         */
        setTestSuiteNameAction: {
            reducer: (
                state: ITestSuiteInitialState,
                { payload }: ISetTestSuiteNameAction,
            ) => ({
                ...state,
                name: payload,
            }),
            prepare: (data?: ISetTestSuiteNamePreparePayload) => {
                if (!data
                    || (!data.session
                    && !data.training
                    && !data.theme)) {
                    return { payload: '' };
                }

                if (data.theme && data.theme !== null) {
                    return {
                        payload: data.theme,
                    };
                }
                if (data.training && data.training !== null) {
                    return {
                        payload: data.training,
                    };
                }
                if (data.session && data.session !== null) {
                    return {
                        payload: data.session,
                    };
                }
            },
        },
        /**
         * Set tasks images.
         * If payload is undefined it will set tasks images
         * to default(empty array).
         */
        setTasksImagesAction: {
            reducer: (
                state: ITestSuiteInitialState,
                { payload }: ISetTestSuiteImagesAction,
            ) => ({
                ...state,
                tasksImages: payload,
            }),
            prepare: (images?: string[]) => ({
                payload: images ? images : [],
            }),
        },
        /**
         * Set explanations images.
         * If payload is undefined it will set explanations images
         * to default(empty array).
         */
        setExplanationsImagesAction: {
            reducer: (
                state: ITestSuiteInitialState,
                { payload }: ISetTestSuiteImagesAction,
            ) => ({
                ...state,
                explanationImages: payload,
            }),
            prepare: (images?: string[]) => ({
                payload: images ? images : [],
            }),
        },
        /**
         * Set answers array.
         * If payload exists
         * returns array which contain objects
         * with right, select, gived answers and answer's type.
         * If payload doesn't exist
         * returns empty array.
         */
        setAnswersAction: {
            reducer: (
                state: ITestSuiteInitialState,
                { payload }: ISetAnswersActions,
            ) => ({
                ...state,
                answers: payload,
            }),
            prepare: (answers?: IAnswerFromResponse[]) => ({
                payload: answers
                    ? answers.map(answer => ({
                        type: answer.type,
                        right: answer.answer,
                        gived: answer.answer.map(() => ''),
                        selected: answer.answer.map(() => ''),
                    } as IAnswer))
                    : [],
            }),
        },
        /**
         * Set selection answer by index.
         * If answer doesn't exist
         * then el in answer array in selectedAnswers prop
         * will be setted to default('')
         * and answer array in givedAnswers prop
         * will be setted to default
         * it means that all answers
         * will be setted to default('').
         * For example:
         *  current state = {
         *    selectedAnswers: ['0', '3', '4', '5'],
         *    givedAnswers: ['0', '3', '4', '5'].
         *  },
         *  id = 0, answerIndex = 1, answer = undefined,
         *  new state = {
         *    selectedAnswers: ['0', '', '4', '5']
         *    givedAnswers: ['', '', '', '']
         *  }.
         */
        selectAnswerByIndexAction: {
            reducer: (
                state: ITestSuiteInitialState,
                { payload }: ISetAnswerByIdAction,
            ) => ({
                ...state,
                answers: state.finished
                    ? state.answers
                    : state.answers.map((answer, index) =>
                    index !== payload.id
                        ? answer
                        : {
                            ...answer,
                            selected: answer.selected.map((el, answerIndex) =>
                                answerIndex === payload.answerIndex
                                    ? payload.answer
                                    : el),
                            gived: answer.gived.map(() => ''),
                        }),
            }),
            prepare: ({ id, answer, answerIndex }: ISetAnswerByIdPreparePayload) => ({
                payload: ({
                    id,
                    answerIndex: answerIndex || 0,
                    answer: answer || '',
                }),
            }),
        },
        /**
         * Set gived answer by index.
         */
        giveAnswerByIndexAction: (
            state: ITestSuiteInitialState,
            { payload }: IGiveAnswerByIdAction,
        ) => ({
            ...state,
            answers: state.answers.map((answer, index) =>
                index === payload
                    ? {
                        ...answer,
                        gived: answer.selected,
                    }
                    : answer),
        }),
    },
});

/** Export actions */
export const {
    testSuiteLoadingAction,
    setTestSuiteFinishedAction,
    setTestSuiteNameAction,
    setTasksImagesAction,
    setExplanationsImagesAction,
    setAnswersAction,
    selectAnswerByIndexAction,
    giveAnswerByIndexAction,
} = testSuite.actions;

/** Export reducer */
export default testSuite.reducer;
