// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

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
        try {
            setUser(jwtDecode(storedUser));
        } catch (error) {
            console.error("Lỗi khi giải mã token:", error);
            sessionStorage.removeItem("userToken"); // Xóa token không hợp lệ
            setUser(null);
        }
        const timer = setTimeout(() => {
            setLoading(false);
        }, 200);
        return () => clearTimeout(timer);
    }, []);
    // Hàm để login, logout hoặc cập nhật thông tin người dùng
    const login = (userData) => {
        if (!userData) {
            setError("Vui lòng đăng nhập");
            return;
        }
        sessionStorage.setItem("userToken", userData); // Lưu vào sessionStorage
        setUser(jwtDecode(userData));
        setError(null);
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("userToken"); // Xóa thông tin người dùng khỏi sessionStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

