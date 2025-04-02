const express = require("express");
const models = require("../models/index");

const AttendanceSession = {
    // 1. Lấy tất cả buổi điểm danh
    getAllSessions: async (req, res) => {
        try {
            const sessions = await models.AttendanceSession.findAll();
            res.json(sessions);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách buổi điểm danh", error });
        }
    },

    // 2. Lấy buổi điểm danh theo ID
    getSessionById: async (req, res) => {
        const { session_id } = req.params;
        try {
            const session = await models.AttendanceSession.findByPk(session_id);
            if (!session) {
                return res.status(404).json({ message: "Không tìm thấy buổi điểm danh" });
            }
            res.json(session);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin buổi điểm danh", error });
        }
    },

    // 3. Thêm buổi điểm danh mới
    createSession: async (req, res) => {
        const { session_code, class_id, date, start_time, end_time, teacher_id } = req.body;
        try {
            const newSession = await models.AttendanceSession.create({
                session_code,
                class_id,
                date,
                start_time,
                end_time,
                teacher_id
            });
            res.status(201).json({ message: "Buổi điểm danh đã được tạo thành công", session: newSession });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo buổi điểm danh", error });
        }
    },

    // 4. Cập nhật buổi điểm danh
    updateSession: async (req, res) => {
        const { session_id } = req.params;
        const { session_code, class_id, date, start_time, end_time, teacher_id } = req.body;
        try {
            const session = await models.AttendanceSession.findByPk(session_id);
            if (!session) {
                return res.status(404).json({ message: "Không tìm thấy buổi điểm danh" });
            }

            await session.update({
                session_code,
                class_id,
                date,
                start_time,
                end_time,
                teacher_id
            });

            res.json({ message: "Cập nhật buổi điểm danh thành công", session });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi cập nhật buổi điểm danh", error });
        }
    },

    // 5. Xóa buổi điểm danh
    deleteSession: async (req, res) => {
        const { session_id } = req.params;
        try {
            const session = await models.AttendanceSession.findByPk(session_id);
            if (!session) {
                return res.status(404).json({ message: "Không tìm thấy buổi điểm danh" });
            }

            await session.destroy();
            res.json({ message: "Xóa buổi điểm danh thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa buổi điểm danh", error });
        }
    },

    // 6. Lấy buổi điểm danh theo mã lớp (class_id)
    getSessionsByClassId: async (req, res) => {
        const { class_id } = req.params;
        try {
            const sessions = await models.AttendanceSession.findAll({
                where: { class_id }
            });

            if (!sessions || sessions.length === 0) {
                return res.status(404).json({ message: "Không có buổi điểm danh nào cho lớp này." });
            }

            res.json(sessions);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy buổi điểm danh theo mã lớp", error });
        }
    }
};

module.exports = AttendanceSession;
