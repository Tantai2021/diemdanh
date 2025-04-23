const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/Student");
const MW = require("../middlewares/checkRole");

router.get("/", MW.verifyToken, StudentController.getAllStudents);
router.get("/not-in-session", MW.verifyToken, MW.checkAdminOrTeacher, StudentController.getStudentsNotInSession);
router.get("/qr-code", MW.verifyToken, StudentController.getQrcodeByUserId);
router.get("/profile", MW.verifyToken, StudentController.getProfile);
router.post("/", MW.verifyToken, MW.checkAdminOrTeacher, StudentController.createStudent);
router.post("/create-bulk-qrcode", MW.verifyToken, MW.checkAdmin, StudentController.createBulkQrcode);
router.put("/profile/:studentId", MW.verifyToken, StudentController.updateStudent);
router.delete("/:student_id", MW.verifyToken, MW.checkAdmin, StudentController.deleteStudent);

module.exports = router;
