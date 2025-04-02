const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AttendanceSession = sequelize.define("attendance_sessions", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    session_code: { type: DataTypes.STRING, allowNull: false },
    class_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    date: { type: DataTypes.DATE, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false, unique: true }
}, { timestamps: false });

module.exports = AttendanceSession;
