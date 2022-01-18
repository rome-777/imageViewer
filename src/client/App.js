import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Nav, MainPage, Photo, Gallery } from './components';

// App contains Nav (persistent throught the app) and serves the Routes
export default function App() {
    return (
        <div id='app'>
            <Nav />
            <Gallery />
            {/* <MainPage /> */}
            {/* <Photo /> */}
            {/* <Routes>
                <Route exact path='/' component={MainPage} />
                <Route path='/photo' component={Photo} />
            </Routes> */}
        </div>
    );
}
