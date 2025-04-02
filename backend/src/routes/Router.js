const express = require("express");
const UserRoutes = require("./User");
const StudentRoutes = require("./Student");
const ClassesRoutes = require("./Classes");
const AttendanceSessionRoutes = require("./AttendanceSession");
const AttendanceRecordRoutes = require("./AttendanceRecord");

const Router = (app) => {
    app.use("/api/auth", UserRoutes);
    app.use("/api/student", StudentRoutes);
    app.use("/api/classes", ClassesRoutes);
    app.use("/api/attendance-session", AttendanceSessionRoutes);
    app.use("/api/attendance-record", AttendanceRecordRoutes);
};
module.exports = Router;