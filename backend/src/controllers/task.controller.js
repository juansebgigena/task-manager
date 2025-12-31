import * as taskService from "../services/task.service.js"

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks({
      assigned_user_id: req.user.id,
      status: req.query.status
    });
    res.json(tasks);
  } catch (error) {
    if (error.message === "Task not found") return res.status(404).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await taskService.createTask({
      title,
      description,
      assigned_user_id: req.user.id
    });

    res.status(201).json({
      message: "Create successful",
      task: {
        id: task.id,
        status: task.status,
        title,
        description
      }
    });
  } catch (error) {
    if (error.message === "User not found") return res.status(404).json({ message: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    await taskService.completeTask({
      id: req.params.id,
      assigned_user_id: req.user.id,
      status: req.body.status
    });
    res.json({ message: "Update successful" });
  } catch (error) {
    if (error.message === "Task not found") return res.status(404).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask({
      id: req.params.id,
      assigned_user_id: req.user.id,
    });
    res.sendStatus(204);
  } catch (error) {
    if (error.message === "Task not found") return res.status(404).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};