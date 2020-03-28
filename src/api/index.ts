/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create Api class which have methods which make API calls to backend endpoints.
 */

// External imports
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Application's imports
import {
    IApi,
    ISignUpCredentials,
    ISignInCredentials,
    ISubjectConfigurationCredentials,
    ITestSuiteCredentials,
    ITestSuiteImagesCredentials,
    ITestSuiteResponseData,
    TTestSuiteImagesResponseData,
} from './types';

class Api implements IApi {
    axiosInstance: AxiosInstance;

    constructor() {
        const mode = process.env.NODE_ENV || 'production';

        const baseURL = mode === 'production'
            ? `${process.env.API_ENDPOINT}`
            : 'http://localhost:4000';

        this.axiosInstance = axios.create({
            baseURL,
            timeout: 10000,
        });
    }

    signup = async (credentials: ISignUpCredentials) =>
        await this.axiosInstance.post(
            'api/auth/signup',
            { ...credentials },
            { withCredentials: true },
        )

    signin = async (credentials: ISignInCredentials) =>
        await this.axiosInstance.post(
            'api/auth/signin',
            { ...credentials },
            { withCredentials: true },
        )

    me = async () =>
        await this.axiosInstance.get(
            'api/auth/me',
            { withCredentials: true },
        )

    logout = async () =>
        await this.axiosInstance.post(
            'api/auth/logout',
            {},
            { withCredentials: true },
        )

    subjects = async () =>
        await this.axiosInstance.get(
            'api/subject',
            { withCredentials: true },
        )

    /**
     * @value (String) subject name.
     */
    subjectConfiguration = async (credentials: ISubjectConfigurationCredentials) =>
        await this.axiosInstance.get(
            `api/subject-config/${credentials.id}`,
            { withCredentials: true },
        )

    testSuite = async (credentials: ITestSuiteCredentials): Promise<AxiosResponse<ITestSuiteResponseData>> => {
        /** Generate query string */
        const searchParams = new URLSearchParams(Object.entries(credentials));

        return await this.axiosInstance.get(
            `api/test-suite?${searchParams}`,
            { withCredentials: true },
        );
    }

    tasksImages = async (credentials: ITestSuiteImagesCredentials) =>
        await this.axiosInstance.get(
            `api/test-suite/${credentials.id}/images/task`,
            { withCredentials: true },
        )

    explanationsImages = async (credentials: ITestSuiteImagesCredentials) =>
        await this.axiosInstance.get(
            `api/test-suite/${credentials.id}/images/explanation`,
            { withCredentials: true },
        )

    testSuiteImages = async (credentials: ITestSuiteImagesCredentials): Promise<AxiosResponse<TTestSuiteImagesResponseData>[]> =>
        await axios.all([await this.tasksImages(credentials), await this.explanationsImages(credentials)])
}

// Export all types related to Api
export * from './types';

// Export Api class
export default new Api();
