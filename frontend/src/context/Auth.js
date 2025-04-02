// src/context/AuthContext.js
import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useContext, useEffect } from "react";

// Tạo context cho authentication
const AuthContext = createContext();

// Custom hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);

// Cung cấp AuthProvider để quản lý thông tin xác thực
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Dữ liệu người dùng
    const [loading, setLoading] = useState(true); // Đang tải thông tin người dùng
    const [error, setError] = useState(null);

    // Giả lập việc kiểm tra đăng nhập (ví dụ từ localStorage hoặc gọi API)
    useEffect(() => {
        const storedUser = sessionStorage.getItem("userToken");
        if (storedUser) {
            try {
                setUser(jwtDecode(JSON.parse(storedUser).token));
            } catch (error) {
                console.error("Lỗi parse userToken:", error);
                sessionStorage.removeItem("userToken");
            }
        }

        setLoading(false);
    }, []);
    // Hàm để login, logout hoặc cập nhật thông tin người dùng
    const login = (userData) => {
        if (!userData || !userData.token) {
            setError("Token không hợp lệ");
            console.log("Token không hợp lệ");
            return;
        }

        sessionStorage.setItem("userToken", JSON.stringify(userData)); // Lưu vào sessionStorage
        setUser(userData);
        setError(null);
    };

    const logout = () => {
        setUser(null);
        setLoading(true);
        sessionStorage.removeItem("userToken"); // Xóa thông tin người dùng khỏi sessionStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

