const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    updateUser,
} = require("../services/UserService");
const verifyToken = require("../middleware/ProtectMiddleware");

// Register a User  --- POST method
router.post("/register", async (req, res) => {
    try {
        const response = await registerUser(req.body);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(err.code).json(err.message);
    }
});

// Login a User  --- POST method
router.post("/login", async (req, res) => {
    try {
        const response = await loginUser(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.code).json(error.message);
    }
});

// Update User Profile
router.put("/updateProfile", verifyToken, async (req, res) => {
    const { name, email } = req.body;
    const id = req.user._id;
    try {
        const response = await updateUser(name, email, id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.code).json(error.message);
    }
});

module.exports = router;
