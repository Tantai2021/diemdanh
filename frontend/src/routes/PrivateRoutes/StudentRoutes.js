import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Navigate, Outlet } from "react-router-dom";
const StudentRoutes = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Hoặc bạn có thể hiển thị một loading spinner
    }
    if (!user)
        return <Navigate to={"/login"} replace />;

    return <Outlet />;
};
export default StudentRoutes;