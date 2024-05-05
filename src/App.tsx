import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeView from "./views/HomeView";
import Login from "./views/Login";

const App = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
    );
};

export default App;
