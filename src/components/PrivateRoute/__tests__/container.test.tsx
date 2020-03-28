/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Create test suites for PriavateRoute container.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { mount } from 'enzyme';
import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

/** Application's imports */
import container from '../container';
import { selectIsLoggedIn } from 'store/selectors/auth/signin';
import { TRoutesProps } from 'routes/container';

/** Mock modules */
jest.mock('store/selectors/auth/signin');

describe('PrivateRoute container', () => {
    const MOCK_STATE: any = {
        auth: {
            signIn: {
                user: null,
            },
        },
    };

    /** Setup store mock */
    const store = createMockStore()(MOCK_STATE);

    test('Sets isLoggedIn prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Stub selector */
        (selectIsLoggedIn as unknown as jest.Mock)
            .mockReturnValue(false);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent>
                    <div />
                </ConfiguredComponent>
            </Provider>,
        );

        /** Assert isLoggedIn prop as expected */
        expect((componentWrapper.props() as TRoutesProps).isLoggedIn).toBeFalsy();
    });
});
