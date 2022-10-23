import { Sequelize } from "sequelize";

const db = new Sequelize("task", "fikus", "1973@David", {
  host: "task.mysql.database.azure.com",
  dialect: "mysql",
});

export default db;
