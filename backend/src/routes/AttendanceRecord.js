const express = require("express");
const AttendanceRecord = require("../controllers/AttendanceRecord");  // Import controller

const router = express.Router();

// 1. Lấy tất cả bản ghi điểm danh
router.get("/", AttendanceRecord.getAllAttendanceRecords);

// 2. Lấy bản ghi điểm danh theo session_id
router.get("/session/:session_id", AttendanceRecord.getAttendanceRecordsBySessionId);

// 3. Lấy bản ghi điểm danh theo student_id
router.get("/student/:student_id", AttendanceRecord.getAttendanceRecordByStudentId);

// 4. Tạo bản ghi điểm danh mới
router.post("/", AttendanceRecord.createAttendanceRecord);

// 5. Cập nhật bản ghi điểm danh
router.put("/:record_id", AttendanceRecord.updateAttendanceRecord);

// 6. Xóa bản ghi điểm danh
router.delete("/:record_id", AttendanceRecord.deleteAttendanceRecord);

module.exports = router;
