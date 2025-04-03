const jwt = require("jsonwebtoken");

// Middleware xác thực token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(' ')[1];
    console.log("Token nhận được", token);

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
    console.log("verify token")
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
    console.log("Check role called");
};

// Middleware kiểm tra quyền sở hữu sinh viên (dành cho trường hợp sinh viên tự chỉnh sửa thông tin)
const checkStudentOwner = (req, res, next) => {
    const { student_id } = req.params;
    if (req.user.id !== student_id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Không có quyền chỉnh sửa thông tin sinh viên này" });
    }
    next();  // Tiếp tục nếu là sinh viên của chính họ hoặc admin
};

module.exports = { verifyToken, checkAdmin, checkTeacher, checkAdminOrTeacher, checkStudentOwner };
