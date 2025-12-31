import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import { 
    completeTaskSchema,
    createTaskSchema,
    getTasksSchema,
    deleteTaskSchema
} from "../validations/task.validation.js";
import {
    getTasks,
    createTask,
    completeTask,
    deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", validateMiddleware(getTasksSchema), getTasks);
router.post("/", validateMiddleware(createTaskSchema), createTask);
router.put("/:id", validateMiddleware(completeTaskSchema), completeTask);
router.delete("/:id", validateMiddleware(deleteTaskSchema), deleteTask);

export default router;
