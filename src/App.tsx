import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./element/pages/HomePage";
import {Navbar} from "./element/Navbar";
import {SignInPage} from "./element/pages/SignInPage";
import {SignUpPage} from "./element/pages/SignUpPage";
import {AdminPanelPage} from "./element/pages/AdminPanelPage";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/signin"} element={<SignInPage/>}/>
                <Route path={"/signup"} element={<SignUpPage/>}/>
                <Route path={"/admin"} element={<AdminPanelPage/>}/>
            </Routes>
        </>
    );
}

export default App;
