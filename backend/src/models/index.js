const sequelize = require("../config/database");

const User = require("./User");
const Teacher = require("./Teacher");
const Student = require("./Student");
const Qrcode = require("./Qrcode");
const Classes = require("./Classes");
const AttendanceSession = require("./AttendanceSession");
const AttendanceRecord = require("./AttendanceRecord");

// Thiết lập quan hệ

// 1. Quan hệ giữa User - Teacher / Student
User.hasOne(Teacher, { foreignKey: "user_id" });
Teacher.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Student, { foreignKey: "user_id" });
Student.belongsTo(User, { foreignKey: "user_id" });

// 2. Teacher - Classes (1 giáo viên dạy nhiều lớp)
Teacher.hasMany(Classes, { foreignKey: "teacher_id" });  // ✅ Sử dụng teacher_id thay vì teacher_code
Classes.belongsTo(Teacher, { foreignKey: "teacher_id" });

// 3. Class - AttendanceSession (1 lớp có nhiều buổi điểm danh)
Classes.hasMany(AttendanceSession, { foreignKey: "class_id" });
AttendanceSession.belongsTo(Classes, { foreignKey: "class_id" });

// 4. AttendanceSession - AttendanceRecord (1 buổi có nhiều bản ghi điểm danh)
AttendanceSession.hasMany(AttendanceRecord, { foreignKey: "session_id" });
AttendanceRecord.belongsTo(AttendanceSession, { foreignKey: "session_id" });

// 5. Student - AttendanceRecord (1 sinh viên có nhiều bản ghi điểm danh)
Student.hasMany(AttendanceRecord, { foreignKey: "student_id" });  // ✅ Đổi từ student_code thành student_id
AttendanceRecord.belongsTo(Student, { foreignKey: "student_id" });

// 6. Student - Qrcode (1 sinh viên có 1 mã QR để điểm danh)
Student.hasOne(Qrcode, { foreignKey: "student_id" });  // ✅ Đổi từ student_code thành student_id
Qrcode.belongsTo(Student, { foreignKey: "student_id" });

module.exports = {
    sequelize,
    User,
    Teacher,
    Student,
    Qrcode,
    Classes,
    AttendanceSession,
    AttendanceRecord,
};
