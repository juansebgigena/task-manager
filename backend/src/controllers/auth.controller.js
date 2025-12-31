import * as authService from "../services/auth.service.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await authService.createUser({ name, email, password });

        res.status(201).json({ message: "Create successful" });
    } catch (error) {
        if (error.message === "Email already exists") return res.status(400).json({ message: error.message });
        res.status(500).json({ message: "An error ocurred" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, name } = await authService.loginUser({ email, password });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour in miliseconds
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production",
        });

        res.json({ message: "Login successful", user: { name } });
    } catch (error) {
        if (error.message === "Invalid credentials") return res.status(401).json({ message: error.message });
        res.status(500).json({ message: "An error ocurred" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0, });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: "An error ocurred" });
    }
};

export const verifyToken = async (req, res) => {
    try {
        const user = await authService.findUser(req.user.id);
        return res.json({ user });
    } catch (error) {
        if (error.message === "User not found") return res.status(404).json({ message: error.message });
        return res.status(500).json({ error: "An error ocurred" });
    }
};