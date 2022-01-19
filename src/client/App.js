import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Nav, MainPage } from './components';

// App contains Nav (persistent throught the app) and serves the Routes
export default function App() {
    return (
        <div id='app'>
            <Nav />
            <MainPage />
            {/* <Routes>
            </Routes> */}
        </div>
    );
}
