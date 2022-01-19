import { StyledEngineProvider } from '@mui/material/styles';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';

const history = createBrowserHistory();

// App encapsulated
render(
    <StyledEngineProvider injectFirst>
        <Router history={history}>
            <App />
        </Router>
    </StyledEngineProvider>,
    document.getElementById('root')
);