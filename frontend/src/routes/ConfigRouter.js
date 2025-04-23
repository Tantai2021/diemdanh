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
import Student from "../pages/Student/index";

const ConfigRouter = () => {

    return (
        <Routes>
            {/* Private routes */}
            <Route element={<Layout />}>
                <Route path="/" element={<StudentRoutes />}>
                    <Route path="qr-code" element={<Student.Qrcode />} />
                    <Route path="camera" element={<Student.Camera />} />
                    <Route path="profile" element={<Student.Profile />} />
                </Route>
                <Route path="/admin" element={<AdminRoutes />}>
                    <Route path="students" element={<Student.List />} />
                </Route>
                <Route path="/teacher" element={<TeacherRoutes />}>
                    <Route path="timetable" element={<Classes.List />} />
                    <Route path="timetable/record/:class_id" element={<Attendance.Record />} />
                </Route>
            </Route>

            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

        </Routes>
    );
};

export default ConfigRouter;
