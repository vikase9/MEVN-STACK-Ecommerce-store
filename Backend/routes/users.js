const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
} = require("../services/UserService");
const auth = require("../middleware/auth");

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

// UPDATE a User  --- PUT method
router.put("/:id", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const response = await updateUser(name, email, password, req.params.id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.code).json(error.message);
    }
});

// DELETE a User  --- DELETE method
router.delete("/:id", async (req, res) => {
    try {
        const response = await deleteUser(req.params.id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.code).json(error.message);
    }
});

module.exports = router;
