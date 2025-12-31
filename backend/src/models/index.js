import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import createUser from "./user.model.js";
import createTask from "./task.model.js";

const User = createUser(sequelize, DataTypes);
const Task = createTask(sequelize, DataTypes);

User.hasMany(Task, { foreignKey: "assigned_user_id" });
Task.belongsTo(User, { foreignKey: "assigned_user_id" });

export {
    User,
    Task
};