const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Qr_codes = sequelize.define("qr_codes", {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    qr_code: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

module.exports = Qr_codes;
