const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define("students", {
    student_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    student_code: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Student;
