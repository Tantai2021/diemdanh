const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AttendanceRecord = sequelize.define("attendance_records", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    session_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    status: { type: DataTypes.ENUM("Present", "Absent", "None"), defaultValue: "None", allowNull: false },
}, { timestamps: false });

module.exports = AttendanceRecord;
