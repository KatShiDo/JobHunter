require("dotenv").config();
const mongoose = require("mongoose");

const keys = require("@/config/keys");
const {createAdminIfNotExists} = require("@/services/admin");
const { database } = keys;

const setupDB = async () => {
    try {
        await mongoose.connect(database.url, {
            directConnection: true,
            serverSelectionTimeoutMS: 5000,
            appName: "mongoose",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await createAdminIfNotExists();
        return mongoose.connection;
    } catch (error) {
        console.error("Ошибка подключения к MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = setupDB;
