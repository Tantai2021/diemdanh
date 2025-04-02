import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/index";

// PRIVATE ROUTES
import AdminRoutes from "./PrivateRoutes/AdminRoutes";
import TeacherRoutes from "./PrivateRoutes/TeacherRoutes";
import StudentRoutes from "./PrivateRoutes/StudentRoutes";

// PAGES
import Classes from "../pages/Classes/index";
import Attendance from "../pages/Attendance/index";
import LoginPage from "../pages/Auth/Login";
import Unauthorized from "../pages/Unauthorized";

const ConfigRouter = () => {

    return (
        <Routes>
            {/* Private routes */}

            <Route element={<Layout />}>
                <Route path="/" element={<StudentRoutes />}>
                    <Route index element={<Classes.List />} />
                </Route>
                <Route path="/admin" element={<AdminRoutes />}>
                    <Route index element={<Classes.List />} />
                </Route>
                <Route path="/teacher" element={<TeacherRoutes />}>
                    <Route index element={<Classes.List />} />
                    <Route path="attendance-record/:class_id" element={<Attendance.Record />} />
                </Route>
            </Route>

            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

        </Routes>
    );
};

export default ConfigRouter;