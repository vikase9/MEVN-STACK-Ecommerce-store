const productDB = require("../models/ProductDB");

// Update a User
const addProduct = (name, price, image, description, category, path) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!name || !price || !description || !category) {
                return reject({
                    code: 400,
                    message: "Bad request, all fields must be included...",
                });
            }
            const newProduct = new productDB({
                name,
                price,
                image: path,
                description,
                category,
            });
            const savedProduct = await newProduct.save();
            resolve(savedProduct);
        } catch (error) {
            reject({
                code: 500,
                message: error,
            });
        }
    });
};

module.exports = {
    addProduct,
};
