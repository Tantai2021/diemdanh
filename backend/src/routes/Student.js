const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/Student");

router.get("/", StudentController.getAllStudents);
router.get("/:student_id", StudentController.getStudentById);
router.post("/", StudentController.createStudent);
router.put("/:student_id", StudentController.updateStudent);
router.delete("/:student_id", StudentController.deleteStudent);

module.exports = router;
