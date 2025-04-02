// src/routes/Auth/index.js
import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../../pages/Auth/Login"; // Import các trang con

const AuthRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default AuthRoutes;
