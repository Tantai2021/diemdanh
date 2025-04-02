import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/index";

import AuthRoutes from "./Auth/index";
import StudentRoutes from "./Student/index";
import AdminRoutes from "./Admin/index";
import MiddleWare from "../middlewares/checkLogin";

const ConfigRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MiddleWare><Layout /></MiddleWare>}>
                <Route path="/*" element={<StudentRoutes />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
            </Route>
            <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
    );
};

export default ConfigRouter;