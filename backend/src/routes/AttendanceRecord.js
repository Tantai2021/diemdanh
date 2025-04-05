const express = require("express");
const AttendanceRecord = require("../controllers/AttendanceRecord");  // Import controller
const MW = require("../middlewares/checkRole");

const router = express.Router();

// 1. Lấy tất cả bản ghi điểm danh
router.get("/", MW.verifyToken, AttendanceRecord.getAllAttendanceRecords);

// 2. Lấy bản ghi điểm danh theo session_id
router.get("/session/:session_id", MW.verifyToken, AttendanceRecord.getAttendanceRecordsBySessionId);

// 3. Lấy bản ghi điểm danh theo student_id
router.get("/student/:student_id", MW.verifyToken, AttendanceRecord.getAttendanceRecordByStudentId);

// 4. Lấy tất cả bản ghi theo class_id
router.get("/classes", MW.verifyToken, MW.checkAdminOrTeacher, AttendanceRecord.getAttendanceRecordsByClassId);

// 4. Tạo bản ghi điểm danh mới
router.post("/", MW.verifyToken, MW.checkAdminOrTeacher, AttendanceRecord.createAttendanceRecord);

// 5. Cập nhật bản ghi điểm danh
router.put("/", MW.verifyToken, MW.checkAdminOrTeacher, AttendanceRecord.updateAttendanceRecord);
router.put("/camera", MW.verifyToken, MW.checkAdminOrTeacher, AttendanceRecord.updateAttendanceRecordByStudentCode);

// 6. Xóa bản ghi điểm danh
router.delete("/", MW.verifyToken, MW.checkAdminOrTeacher, AttendanceRecord.bulkDeleteAttendanceRecord);

module.exports = router;
