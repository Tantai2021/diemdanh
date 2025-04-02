import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth"; // Đảm bảo rằng MiddleWare nhận AuthContext

const MiddleWare = ({ children }) => {
    const { user, loading } = useAuth(); // Đọc dữ liệu từ context

    useEffect(() => {
        console.log(user)
    }, [user]);

    if (loading) {
        return <div>Đang tải...</div>;  // Hiển thị loading khi đang kiểm tra người dùng
    }

    // Nếu không có user, chuyển hướng đến trang đăng nhập
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    // Kiểm tra quyền của người dùng và điều hướng nếu có vai trò
    if (user) {
        if (user.role === "admin") {
            return <Navigate to="/admin" replace />;
        } else if (user.role === "teacher") {
            return <Navigate to="/teacher" replace />;
        }
    }

    // Nếu tất cả hợp lệ, tiếp tục hiển thị nội dung con
    return <>{children}</>;
};

export default MiddleWare;
