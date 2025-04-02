// src/routes/Auth/index.js
import React from "react";
import { Route, Routes } from "react-router-dom";

// import student page
import ClassHome from "../../pages/Classes/Home";

const StudentRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<ClassHome />} />
            </Routes>
        </div>
    );
};

export default StudentRoutes;
