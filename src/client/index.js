import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';

const history = createBrowserHistory();

// App encapsulated
render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById('root')
);