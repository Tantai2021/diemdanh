import { useEffect } from "react";
import { useAuth } from "../context/Auth";
import { Outlet, useNavigate } from "react-router-dom";

const MiddleWare = () => {
    const { user, loading } = useAuth(); // Lấy dữ liệu từ context
    const navigate = useNavigate(); // Sử dụng useNavigate thay vì Navigate trực tiếp

    useEffect(() => {
        if (!loading) { // Chỉ điều hướng khi đã load xong
            if (!user) {
                navigate("/auth/login", { replace: true });
                return null;
            } else if (user.role === "admin") {
                navigate("/admin", { replace: true });
                return null;
            } else if (user.role === "teacher") {
                navigate("/teacher", { replace: true });
                return null;
            }
        }
    }, [user, loading]); // Lắng nghe sự thay đổi của user và loading

    if (loading) {
        return <div>Đang tải...</div>; // Hiển thị loading khi đang kiểm tra user
    }

    return <Outlet />; // Hiển thị nội dung của route con nếu hợp lệ
};

export default MiddleWare;
