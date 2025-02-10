const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("@/models/user");
const {sendEmail} = require("@/services/mailer");

const keys = require("@/config/keys");
const { app } = keys;

const createAdminIfNotExists = async () => {
    try {
        const adminExists = await User.findOne({ role: "admin" });

        if (!adminExists) {
            const plainPassword = crypto.randomBytes(8).toString("hex");
            const hashedPassword = await bcrypt.hash(plainPassword, 10);

            const newAdmin = new User({
                username: "admin",
                email: "admin@admin.com",
                password: hashedPassword,
                role: "admin",
                confirmed: true
            });

            await newAdmin.save();
            console.log(app.email);
            await sendEmail(app.email, "create-admin", {
                password: plainPassword,
                language: "ru",
            });
            console.log(`Администратор создан.\nЛогин: admin@admin.com\nПароль: ${plainPassword}`);
        } else {
            console.log("Администратор уже существует.");
        }
    } catch (error) {
        console.error("Ошибка при создании администратора:", error);
    }
};

module.exports = { createAdminIfNotExists };
