import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(200),
    description: z.string().optional(),
  }),
});

export const getTasksSchema = z.object({
  query: z.object({
    status: z.enum(["pending", "completed"]).optional(),
  }),
});

export const completeTaskSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(["pending", "completed"])
  }),
});

export const deleteTaskSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
