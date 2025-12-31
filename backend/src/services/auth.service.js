import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const createUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("Email already exists");

    const password_hash = await bcrypt.hash(password, 10);

    await User.create({ name, email, password_hash });
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { token, name: user.name };
};

export const findUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    return { name: user.name };
};
