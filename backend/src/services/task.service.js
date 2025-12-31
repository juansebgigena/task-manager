import { Task, User } from "../models/index.js";

export const createTask = async ({ title, description, assigned_user_id }) => {
  const user = await User.findByPk(assigned_user_id);
  if (!user) throw new Error("User not found");

  const task = await Task.create({ title, description, assigned_user_id });
  return task;
};

export const completeTask = async ({ id, assigned_user_id, status }) => {
  const task = await Task.findOne({ where: { id, assigned_user_id } });
  if (!task) throw new Error("Task not found");

  task.status = status;
  await task.save();
};

export const deleteTask = async ({ id, assigned_user_id }) => {
  const deletedTask = await Task.destroy({ where: { id, assigned_user_id } });
  if (!deletedTask) throw new Error("Task not found");
};

export const getTasks = async ({ assigned_user_id, status }) => {
  const where = {
    assigned_user_id
  };
  if (status) where.status = status;

  const tasks = await Task.findAll({ where, attributes: ["id", "title", "description", "status"] });
  return tasks;
};
