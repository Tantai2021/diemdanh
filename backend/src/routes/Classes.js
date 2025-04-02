const express = require("express");
const router = express.Router();
const ClassesController = require("../controllers/Classes");

router.get("/", ClassesController.getAllClasses);
router.get("/:class_id", ClassesController.getClassById);
router.get("/teacher/:teacher_id", ClassesController.getClassesByTeacherId);
router.post("/", ClassesController.createClass);
router.put("/:class_id", ClassesController.updateClass);
router.delete("/:class_id", ClassesController.deleteClass);

module.exports = router;
