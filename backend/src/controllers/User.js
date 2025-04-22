const models = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Tìm user theo email
            const user = await models.User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" }); // Sử dụng return để dừng tiếp tục xử lý
            }

            // Kiểm tra mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" }); // Sử dụng return để dừng tiếp tục xử lý
            }

            const userInfo = user.role === 'teacher'
                ? await await models.Teacher.findOne({ where: { user_id: user.id } })
                : await await models.Student.findOne({ where: { user_id: user.id } })
            // Tạo token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role, info: userInfo },
                process.env.SECRET_KEY, // Thay thế bằng SECRET_KEY thực tế
                { expiresIn: "7h" }
            );

            return res.status(200).json({ message: "Đăng nhập thành công!", token }); // Sử dụng return để dừng tiếp tục xử lý
        } catch (error) {
            return res.status(500).json({ message: "Lỗi đăng nhập!" });
        }
    },

    createAccount: async (req, res) => {
        const { email, password, role } = req.body;

        try {
            // Kiểm tra xem email đã tồn tại chưa
            const existingUser = await models.User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email đã được sử dụng!" });
            }

            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo tài khoản mới
            const newUser = await models.User.create({
                email,
                password: hashedPassword,
                role: role || "student",  // Mặc định role là "student" nếu không có
            });

            return res.status(201).json({ message: "Tạo tài khoản thành công!", user: newUser });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi tạo tài khoản!", error });
        }
    }
};

module.exports = User;
