/**
 * Create by: Oleksandr Bezrukov
 * Creation date: 25 February 2020
 *
 * Render application via ReactDOM.
 */

// External imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Application's imports
import store from 'store';
import App from './containers/App';
import 'public/styles/index.css';

// Get root div
const root = document.getElementById('root');

// Render application into root div
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root,
);
