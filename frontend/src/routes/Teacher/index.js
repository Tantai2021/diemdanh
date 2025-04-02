// src/routes/Auth/index.js
import React from "react";
import { Route, Routes } from "react-router-dom";

// import student page
import Home from "../../pages/Classes/Home";

const StudentRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
};

export default StudentRoutes;
