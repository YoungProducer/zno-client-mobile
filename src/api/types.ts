/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Declare main interfaces related to API.
 */

// External imports
import { AxiosResponse, AxiosInstance } from 'axios';

export interface ISignUpCredentials {
    email: string;
    password: string;
}

export interface ISignInCredentials {
    email: string;
    password: string;
}

export interface ISubjectConfigurationCredentials {
    id: string;
}

/** Typings for testSuite method */
export interface ITestSuiteCredentials {
    subjectId: string;
    subSubjectId?: string;
    theme?: string;
    /**
     * If user select exams
     * and sessions type of exams
     * this value must contain
     * the value of selected session
     */
    session?: string;
    /**
     * If user select exams
     * and trainings type of exams
     * this value must contain
     * the value of selected training
     */
    training?: string;
}

export type TAnswerType = 'SINGLE' | 'RELATIONS' | 'TEXT';

export interface IAnswerFromResponse {
    /**
     * Index of task.
     */
    taskId: number;
    answer: string[];
    type: TAnswerType;
}

export interface ITestSuiteResponseData {
    /**
     * Test suite id.
     */
    id: string;
    /**
     * Theme name.
     */
    theme?: string | null;
    /**
     * Session name.
     */
    session?: string | null;
    /**
     * Training variant name.
     */
    training?: string | null;
    /**
     * Answers.
     */
    answers: IAnswerFromResponse[];
}

/** Types for method testSuiteImages */
export interface ITestSuiteImagesCredentials {
    /**
     * Test suite id.
     */
    id: string;
}

export type TTestSuiteImagesResponseData = string[];

export interface IApi {
    axiosInstance: AxiosInstance;
    /** Methods related to auth */
    signup(credentials: ISignUpCredentials): Promise<AxiosResponse>;
    signin(credentials: ISignInCredentials): Promise<AxiosResponse>;
    me(): Promise<AxiosResponse>;
    logout(): Promise<AxiosResponse>;

    /** Methods related to subjects and subject configuration */
    subjects(): Promise<AxiosResponse>;
    subjectConfiguration(credentials: ISubjectConfigurationCredentials): Promise<AxiosResponse>;

    /** Methods related to test suites */
    testSuite(credentials: ITestSuiteCredentials): Promise<AxiosResponse<ITestSuiteResponseData>>;
    testSuiteImages(credentials: ITestSuiteImagesCredentials): Promise<AxiosResponse<TTestSuiteImagesResponseData>[]>;
    tasksImages(credentials: ITestSuiteImagesCredentials): Promise<AxiosResponse>;
    explanationsImages(credentials: ITestSuiteImagesCredentials): Promise<AxiosResponse>;
}
