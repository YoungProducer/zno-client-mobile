/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Component which contain main routes of application.
 */

/** External imports */
import React, { Suspense } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

/** Application's imports */
import PrivateRoute from 'components/PrivateRoute';
import { TRoutesProps } from './container';
import FullPageLoading from 'components/custom/FullPageLoading';

/** Lazy loaded components */
const SignIn = React.lazy(() => import('components/SignIn'));
const SignUp = React.lazy(() => import('components/SignUp'));
const SubjectSelection = React.lazy(() => import('./SubjectSelection'));
const SubjectConfiguration = React.lazy(() => import('./SubjectConfiguration'));
const TestSuite = React.lazy(() => import('./TestSuite'));

/** Create component */
const Component = ({ isLoggedIn }: TRoutesProps) => {
    return (
        <Suspense fallback={<FullPageLoading />}>
            <Switch>
                <Route exact path='/'>
                    <Redirect to={{
                        pathname: '/subject-selection',
                        state: { from: '/' },
                    }}/>
                </Route>
                <Route exact path='/subject-selection'>
                    <SubjectSelection />
                </Route>
                <PrivateRoute
                    exact
                    path='/subject-selection/subject-configuration'
                >
                    <SubjectConfiguration />
                </PrivateRoute>
                <PrivateRoute
                    exact
                    path='/subject-configuration/:subjectId'
                >
                    <SubjectConfiguration />
                </PrivateRoute>
                <PrivateRoute
                    exact
                    path='/test-suite'
                >
                    <TestSuite />
                </PrivateRoute>
                <Route exact path='/auth/signin' component={SignIn} />
                <Route exact path='/auth/signup'>
                    { isLoggedIn
                        ? <Redirect
                            to={{
                                pathname: '/subject-selection',
                                state: { from: '/auth/signup' },
                            }}
                        />
                        : <SignUp />
                    }
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Component;
