const models = require("../models/index");
const { Op } = require("sequelize");

const AttendanceRecord = {
    // 1. Lấy tất cả bản ghi điểm danh
    getAllAttendanceRecords: async (req, res) => {
        try {
            const records = await models.AttendanceRecord.findAll({
                attributes: ['id', 'student_id', 'session_id', 'status']
            });

            // Kiểm tra nếu không có bản ghi điểm danh nào
            if (records.length === 0) {
                return res.status(404).json({ message: "Không có bản ghi điểm danh nào" });
            }

            res.json(records);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy bản ghi điểm danh", error });
        }
    },

    // 2. Lấy bản ghi điểm danh theo student_id
    getAttendanceRecordByStudentId: async (req, res) => {
        const { student_id } = req.params;

        try {
            const records = await models.AttendanceRecord.findAll({
                where: { student_id },
                attributes: ['id', 'student_id', 'session_id', 'status']
            });

            if (!records || records.length === 0) {
                return res.status(404).json({ message: "Không tìm thấy bản ghi điểm danh cho sinh viên này" });
            }

            res.json(records);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy bản ghi điểm danh của sinh viên", error });
        }
    },

    // 3. Thêm bản ghi điểm danh mới
    createAttendanceRecord: async (req, res) => {
        const { student_ids, session_id, status } = req.body;
        if (!Array.isArray(student_ids) || student_ids.length === 0 || !session_id) {
            return res.status(400).json({ message: "Danh sách sinh viên không hợp lệ" });
        }

        try {
            const records = student_ids.map(student_id => ({
                student_id,
                session_id,
                status: status || "None"
            }));

            const newRecord = await models.AttendanceRecord.bulkCreate(records);

            res.status(201).json({ message: "Bản ghi điểm danh đã được tạo thành công", record: newRecord });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo bản ghi điểm danh", error });
        }
    },

    // 4. Cập nhật bản ghi điểm danh
    updateAttendanceRecord: async (req, res) => {
        const { record_id } = req.params;
        const { status } = req.body;

        try {
            const record = await models.AttendanceRecord.findByPk(record_id);
            if (!record) {
                return res.status(404).json({ message: "Không tìm thấy bản ghi điểm danh" });
            }

            await record.update({
                status
            });

            res.json({ message: "Cập nhật bản ghi điểm danh thành công", record });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi cập nhật bản ghi điểm danh", error });
        }
    },

    // 5. Xóa bản ghi điểm danh
    bulkDeleteAttendanceRecord: async (req, res) => {
        const { record_ids } = req.body;

        if (!Array.isArray(record_ids) || record_ids.length === 0) {
            return res.status(400).json({ message: "Danh sách bản ghi không hợp lệ" });
        }

        try {
            const deletedRecords = await models.AttendanceRecord.destroy({
                where: {
                    id: record_ids  // Chọn các bản ghi có id trong mảng record_ids
                }
            });

            if (deletedRecords === 0) {
                return res.status(404).json({ message: "Không tìm thấy bản ghi điểm danh nào để xóa" });
            }

            return res.json({ message: `${deletedRecords} bản ghi điểm danh đã được xóa thành công` });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi xóa bản ghi điểm danh", error });
        }
    },

    // 6. Lấy bản ghi điểm danh theo session_id
    getAttendanceRecordsBySessionId: async (req, res) => {
        const { session_id } = req.params;  // Lấy session_id từ tham số trong URL

        try {
            // Truy vấn bảng AttendanceRecord để lấy các bản ghi theo session_id
            const records = await models.AttendanceRecord.findAll({
                where: { session_id },
                attributes: ['id', 'student_id', 'session_id', 'status']
            });

            // Nếu không có bản ghi nào, trả về lỗi
            if (records.length === 0) {
                return res.status(404).json({ message: "Không tìm thấy bản ghi điểm danh cho buổi học này." });
            }

            // Trả về các bản ghi điểm danh đã tìm thấy
            res.json(records);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy bản ghi điểm danh", error });
        }
    },

    // 7. Lấy danh sách bản ghi điểm danh theo class_id và teacher_id
    getAttendanceRecordsByClassId: async (req, res) => {
        const { class_id } = req.query;  // Lấy session_id từ tham số trong URL
        const user = req.user;

        if (!class_id || !user)
            return res.status(401).json({ message: "Thiếu thông tin cần thiết" });

        try {
            const teacher = await models.Teacher.findOne({
                where: { user_id: user.id },
                attributes: ["teacher_id"]
            })

            if (!teacher)
                return res.status(401).json({ message: "Không tìm thấy thông tin giáo viên" });

            const session = await models.AttendanceSession.findOne({
                where: {
                    [Op.and]: [
                        { class_id: class_id },
                        { teacher_id: teacher.teacher_id }
                    ]
                },
                attributes: ["id", "session_code", "id"]
            });

            if (!session)
                return res.status(401).json({ message: "Chưa tạo buổi điểm danh" });

            let records = await models.AttendanceRecord.findAll({
                where: { session_id: session.id },
                include: {
                    model: models.Student,
                    attributes: ["first_name", "last_name"]
                }
            });

            return res.status(200).json({
                value: records,
                session_code: session.session_code,
                session_id: session.id
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Lỗi khi lấy bản ghi điểm danh", error });
        }
    }
};

module.exports = AttendanceRecord;
