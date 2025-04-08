const express = require("express");
const router = express.Router();
const ClassesController = require("../controllers/Classes");
const MW = require("../middlewares/checkRole");


router.get("/", MW.verifyToken, ClassesController.getAllClasses);
router.get("/teacher", MW.verifyToken, MW.checkAdminOrTeacher, ClassesController.getClassesByTeacherId);
router.get("/:class_id", MW.verifyToken, ClassesController.getClassById);
router.post("/", MW.verifyToken, MW.checkAdminOrTeacher, ClassesController.createClass);
router.put("/:class_id", MW.verifyToken, MW.checkAdminOrTeacher, ClassesController.updateClass);
router.delete("/:class_id", MW.verifyToken, MW.checkAdminOrTeacher, ClassesController.deleteClass);

module.exports = router;
