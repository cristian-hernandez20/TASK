"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("task", "fikus", "1973@David", {
    host: "task.mysql.database.azure.com",
    dialect: "mysql",
});
exports.default = db;
