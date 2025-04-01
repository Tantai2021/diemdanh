const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Class = sequelize.define("Class", {
    class_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    class_name: { type: DataTypes.STRING, allowNull: false },
    class_code: { type: DataTypes.STRING, allowNull: false },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    end_date: { type: DataTypes.DATEONLY, allowNull: false }
});

module.exports = Class;
