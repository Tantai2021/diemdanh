const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/Student");
const MW = require("../middlewares/checkRole");

router.get("/", MW.verifyToken, StudentController.getAllStudents);
router.get("/:student_id", MW.verifyToken, StudentController.getStudentById);
router.post("/", MW.verifyToken, MW.checkAdminOrTeacher, StudentController.createStudent);
router.put("/:student_id", MW.verifyToken, MW.checkStudentOwner, StudentController.updateStudent);
router.delete("/:student_id", MW.verifyToken, MW.checkAdmin, StudentController.deleteStudent);

module.exports = router;
