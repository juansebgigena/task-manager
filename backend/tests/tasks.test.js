import request from "supertest";
import app from "../src/app.js";

let cookie;

describe("Tasks", () => {
    beforeAll(async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                email: "test@mail.com",
                password: "password123",
            });

        cookie = res.headers["set-cookie"];
    });

    it("should create a task", async () => {
        const res = await request(app)
            .post("/tasks")
            .set("Cookie", cookie)
            .send({
                title: "Test Task",
                description: "Task description",
                assigned_user_id: "UUID",
            });

        expect(res.statusCode).toBe(201);
    });

    it("should list tasks", async () => {
        const res = await request(app)
            .get("/tasks")
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});