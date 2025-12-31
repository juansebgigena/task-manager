import request from "supertest";
import app from "../src/app.js";

describe("Auth", () => {
    const userData = {
        name: "Test User",
        email: "test@mail.com",
        password: "password123",
    };

    it("should create a user", async () => {
        const res = await request(app)
            .post("/users")
            .send(userData);

        expect(res.statusCode).toBe(201);
    });

    it("should login successfully", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                email: userData.email,
                password: userData.password,
            });

        expect(res.statusCode).toBe(200);
        expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should fail with wrong credentials", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                email: userData.email,
                password: "password456",
            });

        expect(res.statusCode).toBe(401);
    });
});
