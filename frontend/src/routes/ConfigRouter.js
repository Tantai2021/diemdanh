import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/index";

import AuthRoutes from "./Auth/index";
import StudentRoutes from "./Student/index";
import AdminRoutes from "./Admin/index";
import MiddleWare from "../middlewares/checkLogin";
import { useAuth } from "../context/Auth";
import LoadPage from "../pages/LoadPage";

const ConfigRouter = () => {
    const { user } = useAuth();
    console.log(user);

    return (
        <Routes>
            {/* Middleware sẽ kiểm tra user trước khi hiển thị nội dung */}
            <Route element={<Layout />}>
                <Route path="/*" element={<StudentRoutes />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
            </Route>
            {/* Định tuyến cho trang đăng nhập */}
            <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
    );
};

export default ConfigRouter;