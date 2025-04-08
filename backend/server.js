require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const cors = require("cors");
const app = express();

const Router = require("./src/routes/Router");

app.use(express.json());
app.use(cors());

Router(app);

// Kết nối database
sequelize.sync({ force: false }).then(() => {
    console.log('✅ Database connected!');
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: http://localhost:${PORT}`);
});
