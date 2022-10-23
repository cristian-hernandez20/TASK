import { DataTypes } from "sequelize";
import db from "../db/connection";

export const Tasks = db.define("Tasks", {
  date: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  hour: {
    type: DataTypes.STRING,
  },
  condition: {
    type: DataTypes.STRING,
    defaultValue: "incomplete",
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

//export default Tasks;
