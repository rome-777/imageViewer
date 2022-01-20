import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CookiesProvider } from 'react-cookie';
import App from './App';

const history = createBrowserHistory();

render(
    <StyledEngineProvider injectFirst>
        <CookiesProvider>
            <Router history={history}>
                <App />
            </Router>
        </CookiesProvider>
    </StyledEngineProvider>,
    document.getElementById('root')
);