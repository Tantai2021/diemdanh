const express = require("express");
const models = require("../models/index");

const Classes = {
    // 1. Lấy tất cả lớp học
    getAllClasses: async (req, res) => {
        try {
            const classes = await models.Classes.findAll();
            return res.json({ classes: classes });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Lỗi khi lấy danh sách lớp học", error });
        }
    },

    // 2. Lấy lớp học theo ID
    getClassById: async (req, res) => {
        const { class_id } = req.params;
        try {
            const classDetail = await models.Classes.findByPk(class_id);
            if (!classDetail) {
                return res.status(404).json({ message: "Không tìm thấy lớp học" });
            }
            res.json(classDetail);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin lớp học", error });
        }
    },

    // 3. Thêm lớp học mới
    createClass: async (req, res) => {
        const { class_code, class_name, teacher_id, start_date, end_date } = req.body;
        try {
            const newClass = await models.Classes.create({
                class_code,
                class_name,
                teacher_id,
                start_date,
                end_date
            });
            res.status(201).json({ message: "Lớp học đã được tạo thành công", class: newClass });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo lớp học", error });
        }
    },

    // 4. Cập nhật thông tin lớp học
    updateClass: async (req, res) => {
        const { class_id } = req.params;
        const { class_code, class_name, teacher_id, start_date, end_date } = req.body;
        try {
            const classDetail = await models.Classes.findByPk(class_id);
            if (!classDetail) {
                return res.status(404).json({ message: "Không tìm thấy lớp học" });
            }

            await classDetail.update({ class_code, class_name, teacher_id, start_date, end_date });
            res.json({ message: "Cập nhật thông tin lớp học thành công", class: classDetail });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi cập nhật lớp học", error });
        }
    },

    // 5. Xóa lớp học
    deleteClass: async (req, res) => {
        const { class_id } = req.params;
        try {
            const classDetail = await models.Classes.findByPk(class_id);
            if (!classDetail) {
                return res.status(404).json({ message: "Không tìm thấy lớp học" });
            }

            await classDetail.destroy();
            res.json({ message: "Xóa lớp học thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa lớp học", error });
        }
    },
    // 6. Lấy lớp học theo teacher_id
    getClassesByTeacherId: async (req, res) => {
        const { teacher_id } = req.params; // Lấy teacher_id từ tham số route

        try {
            // Tìm tất cả lớp học của giáo viên theo teacher_id
            const classes = await models.Classes.findAll({
                where: { teacher_id }
            });

            // Nếu không tìm thấy lớp học nào
            if (!classes || classes.length === 0) {
                return res.status(404).json({ message: "Không có lớp học nào của giáo viên này." });
            }

            res.json(classes); // Trả về danh sách lớp học
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy lớp học theo mã giáo viên", error });
        }
    }
};

module.exports = Classes;
