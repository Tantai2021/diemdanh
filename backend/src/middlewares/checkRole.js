const jwt = require("jsonwebtoken");

// Middleware xác thực token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "Token không có" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }
        req.user = decoded;  // Lưu thông tin người dùng vào reques
        next();  // Tiếp tục xử lý yêu cầu
    });
};

// Middleware kiểm tra quyền admin
const checkAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Không có quyền admin" });
    }
    next();  // Tiếp tục xử lý yêu cầu nếu là admin
};

// Middleware kiểm tra quyền giáo viên (instructor)
const checkTeacher = (req, res, next) => {
    if (req.user.role !== "teacher") {
        return res.status(403).json({ message: "Không có quyền giáo viên" });
    }
    next();  // Tiếp tục xử lý yêu cầu nếu là giáo viên
};

// Middleware kiểm tra quyền admin hoặc giáo viên
const checkAdminOrTeacher = (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "teacher") {
        return res.status(403).json({ message: "Không có quyền admin hoặc giáo viên" });
    }
    next();  // Tiếp tục nếu là admin hoặc giáo viên
};



module.exports = { verifyToken, checkAdmin, checkTeacher, checkAdminOrTeacher,  };
