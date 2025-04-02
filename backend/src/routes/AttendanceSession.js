const express = require("express");
const router = express.Router();
const AttendanceSessionController = require("../controllers/AttendanceSession");

router.get("/", AttendanceSessionController.getAllSessions);
router.get("/:session_id", AttendanceSessionController.getSessionById);
router.get("/class/:class_id", AttendanceSessionController.getSessionsByClassId); // API mới để lấy buổi điểm danh theo class_id
router.post("/", AttendanceSessionController.createSession);
router.put("/:session_id", AttendanceSessionController.updateSession);
router.delete("/:session_id", AttendanceSessionController.deleteSession);

module.exports = router;
