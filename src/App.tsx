import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./element/pages/HomePage";
import {Navbar} from "./element/Navbar";
import {SignInPage} from "./element/pages/SignInPage";
import {SignUpPage} from "./element/pages/SignUpPage";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/signin"} element={<SignInPage/>}/>
                <Route path={"/signup"} element={<SignUpPage/>}/>
            </Routes>
        </>
    );
}

export default App;
