const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Class = sequelize.define("classes", {
    class_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    class_name: { type: DataTypes.STRING, allowNull: false },
    class_code: { type: DataTypes.STRING, allowNull: false },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false }
}, { timestamps: false });

module.exports = Class;
