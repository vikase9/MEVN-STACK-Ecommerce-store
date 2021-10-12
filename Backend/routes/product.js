const express = require("express");
const router = express.Router();
const { addProduct } = require("../services/ProductService");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// multer file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// add a new Product  --- POST method
router.post("/addProduct", upload.single("images"), async (req, res) => {
    const { name, price, image, description, category } = req.body;
    const { path } = req.file;
    try {
        const response = await addProduct(
            name,
            price,
            image,
            description,
            category,
            path
        );
        return res.status(200).json(response);
    } catch (err) {
        return res.status(err.code).json(err.message);
    }
});

module.exports = router;
