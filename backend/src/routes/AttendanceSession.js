const express = require("express");
const router = express.Router();
const AttendanceSessionController = require("../controllers/AttendanceSession");
const MW = require("../middlewares/checkRole");


router.get("/", MW.verifyToken, AttendanceSessionController.getAllSessions);
router.get("/:session_id", MW.verifyToken, AttendanceSessionController.getSessionById);
router.get("/class/:class_id", MW.verifyToken, AttendanceSessionController.getSessionsByClassId);
router.post("/", MW.verifyToken, MW.checkAdminOrTeacher, AttendanceSessionController.createSession);
router.put("/:session_id", MW.verifyToken, MW.checkAdminOrTeacher, AttendanceSessionController.updateSession);
router.delete("/:session_id", MW.verifyToken, MW.checkAdminOrTeacher, AttendanceSessionController.deleteSession);

module.exports = router;
