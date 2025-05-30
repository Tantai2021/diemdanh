const e = require("express");
const models = require("../models/index");
const QRCode = require('qrcode');

const Student = {
    // 1. Lấy danh sách tất cả sinh viên
    getAllStudents: async (req, res) => {
        try {
            const students = await models.Student.findAll();
            res.json(students);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách sinh viên", error });
        }
    },

    // 2. Lấy thông tin một sinh viên theo ID
    getProfile: async (req, res) => {
        const user = req.user;
        try {
            const student = await models.Student.findOne({
                where: { user_id: user.id },
            });
            if (!student) {
                return res.status(404).json({ message: "Không tìm thấy sinh viên" });
            }
            return res.json(student);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy thông tin sinh viên", error });
        }
    },

    // 3. Thêm sinh viên mới
    createStudent: async (req, res) => {
        const { student_code, first_name, last_name, phone, email, user_id } = req.body;
        try {
            if (!student_code || !first_name || !last_name || !phone || !email || !user_id)
                res.status(404).json({ message: "Thiếu thông tin cần thiết" });
            const newStudent = await models.Student.create({
                student_code,
                first_name,
                last_name,
                phone,
                email,
                user_id
            });
            res.status(201).json({ message: "Thêm sinh viên thành công", student: newStudent });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi thêm sinh viên", error });
        }
    },

    // 4. Cập nhật thông tin sinh viên
    updateStudent: async (req, res) => {
        const { studentId } = req.params;
        const { student_code, first_name, last_name, phone, email } = req.body;

        if (!student_code || !first_name || !last_name || !phone || !email)
            res.status(404).json({ message: "Thiếu thông tin cần thiết" });

        try {
            const student = await models.Student.findByPk(studentId);
            if (!student) {
                return res.status(404).json({ message: "Không tìm thấy sinh viên" });
            }

            await student.update({ student_code, first_name, last_name, phone, email });
            return res.json({ message: "Cập nhật thông tin sinh viên thành công", student });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi cập nhật sinh viên", error });
        }
    },

    // 5. Xóa sinh viên
    deleteStudent: async (req, res) => {
        const { student_id } = req.params;
        try {
            const student = await models.Student.findByPk(student_id);
            if (!student) {
                return res.status(404).json({ message: "Không tìm thấy sinh viên" });
            }

            await student.destroy();
            res.json({ message: "Xóa sinh viên thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa sinh viên", error });
        }
    },

    // 6. Lấy danh sách sinh viên chưa có trong buổi học session_id
    getStudentsNotInSession: async (req, res) => {
        try {
            const { session_id } = req.query;
            if (!session_id)
                return res.status(401).json({ message: "Không tìm thấy buổi học" });
            const studentInSession = await models.AttendanceRecord.findAll({
                where: { session_id: session_id },
                attributes: ["student_id"]
            })

            const studentIdsInSession = studentInSession.map(student => student.student_id);

            const allStudent = await models.Student.findAll();

            const studentNotInSession = allStudent.filter(student => !studentIdsInSession.includes(student.student_id));

            return res.status(200).json({ students: studentNotInSession });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ message: "Lỗi Server" });
        }
    },
    createBulkQrcode: async (req, res) => {
        try {
            const student = await models.Student.findAll();
            if (!student) {
                return res.status(404).json({ message: "Không tìm thấy sinh viên" });
            }
            const qrcodes = await Promise.all(student.map(async (student) => {
                const qrcode = await QRCode.toDataURL(student.student_code);
                return { student_id: student.student_id, qrcode };
            }));

            const insertQrcode = await models.Qrcode.bulkCreate(qrcodes.map(qrcode => ({ student_id: qrcode.student_id, qr_code: qrcode.qrcode })));
            if (!insertQrcode) {
                return res.status(404).json({ message: "Không thể tạo QR code" });
            }

            return res.status(200).json({ message: "Tạo QR code thành công", qrcodes });

        } catch (error) {
            console.log(error)
            return res.status(200).json({ message: "Lỗi Server" });
        }
    },
    getQrcodeByUserId: async (req, res) => {
        const userId = req.user.id;
        try {
            const student = await models.Student.findOne({
                where: { user_id: userId }, attributes: ["student_id"]
            });
            console.log(student.student_id);
            const qrcode = await models.Qrcode.findOne({
                where: { student_id: student.student_id },
                attributes: ["qr_code", "student_id"]
            });
            if (!qrcode) {
                return res.status(404).json({ message: "Không tìm thấy QR code cho sinh viên này" });
            }
            return res.status(200).json(qrcode);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy QR code", error });
        }
    }
};

module.exports = Student;
