const express = require("express");
const router = express.Router();
const {
    addProduct,
    getProducts,
    comments,
    deleteProduct,
} = require("../services/ProductService");
const multer = require("multer");
const verifyToken = require("../middleware/protectMiddleware");

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

// add a new Products  --- POST method
router.post(
    "/addProduct",
    verifyToken,
    upload.single("image"),
    async (req, res) => {
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
    }
);

// getAllProducts also getProducts By category
router.get("/getProducts", async (req, res) => {
    try {
        const response = await getProducts(req.query);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(err.code).json(err.message);
    }
});

// comments Products
router.post("/comments/:id", verifyToken, async (req, res) => {
    const { text } = req.body;
    const { name, _id } = req.user;
    const productId = req.params.id;
    try {
        const response = await comments(name, text, productId, _id);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(err.code).json(err.message);
    }
});

// delete a product
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const response = await deleteProduct(req.params.id);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(err.code).json(err.message);
    }
});

module.exports = router;
