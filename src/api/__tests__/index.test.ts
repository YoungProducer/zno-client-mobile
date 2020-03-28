/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 28 Feburary 2020
 *
 * Create test suites for api class.
 */

/** External imports */
import MockAdapter from 'axios-mock-adapter';

/** Application's imports */
import api from 'api';

describe('Api', () => {
    /** Create mock adapter for axios */
    const mockAxios = new MockAdapter(api.axiosInstance);

    afterEach(() => {
        /** Reset axios after each test to prevent unhandled errors */
        mockAxios.reset();
    });

    test('signup success', async () => {
        /** Mock 'api/auth/signup' url */
        mockAxios
            .onPost('api/auth/signup')
            .reply(200);

        /** Get result of signup method */
        const result = await api.signup({
            email: 'foo',
            password: 'bar',
        });

        /** Assert that result has status 200 */
        expect(result.status).toBe(200);
    });

    test('signup success', async () => {
        /** Mock 'api/auth/signin' url */
        mockAxios
            .onPost('api/auth/signin')
            .reply(200);

        /** Get result of signin method */
        const result = await api.signin({
            email: 'foo',
            password: 'bar',
        });

        /** Assert that result has status 200 */
        expect(result.status).toBe(200);
    });

    test('logout success', async () => {
        /** Mock 'api/auth/logout' url */
        mockAxios
            .onPost('api/auth/logout')
            .reply(200);

        /** Get result of logout method */
        const result = await api.logout();

        /** Assert that result has status 200 */
        expect(result.status).toBe(200);
    });

    test('subjectsNames success', async () => {
        /** Mock 'api/subject url */
        mockAxios
            .onGet('api/subject')
            .reply(200, ['foo']);

        /** Get result of subjectsNames method */
        const result = await api.subjects();

        /** Assert response has status 200 */
        expect(result.status).toBe(200);

        /** Assert response data equals ['foo'] */
        expect(result.data).toEqual(['foo']);
    });

    test('subjectConfiguration success', async () => {
        /** Define mocked response */
        const response = {
            subject: {
                name: 'Foo',
                theme: ['Theme 1', 'Theme 2'],
                exams: {
                    trainings: ['Variant 1', 'Variant 2'],
                    sessions: ['2017', '2018'],
                },
            },
        };

        /** Mock api/subject-config/config/{subject-name} url */
        mockAxios
            .onGet('api/subject-config/Foo')
            .reply(200, response);

        /** Get result of subjectConfiguration method */
        const result = await api.subjectConfiguration({ id: 'Foo' });

        /** Assert response has status 200 */
        expect(result.status).toBe(200);

        /** Assert response data equals mocked response */
        expect(result.data).toEqual(response);
    });

    test('testSuite should be called with correct url', async () => {
        /** Mock url */
        mockAxios
            .onGet(new RegExp(`api/test-suite/*`))
            .reply(200);

        /** Get result of testSuite method */
        const result = await api.testSuite({
            subjectId: 'foo',
            theme: '123',
        });

        /** Get search params string from url */
        const search = result.config.url.slice(
            result.config.url.indexOf('?'),
            result.config.url.length,
        );

        /** Get search params */
        const searchParams = new URLSearchParams(search);

        /** Get following params */
        const subjectId = searchParams.get('subjectId');
        const theme = searchParams.get('theme');

        /** Assert search params have right values */
        expect(subjectId).toBe('foo');
        expect(theme).toBe('123');
    });

    test('testSuite images should send 2 requests', async () => {
        /** Mock urls */
        mockAxios
            .onGet(new RegExp(`api/test-suite/foo/images/task`))
            .reply(200);
        mockAxios
            .onGet(new RegExp(`api/test-suite/foo/images/explanation`))
            .reply(200);

        /** Get result of current method */
        const result = await api.testSuiteImages({ id: 'foo' });

        /** Assert methiod returns two responses */
        expect(result).toHaveLength(2);
    });
});
