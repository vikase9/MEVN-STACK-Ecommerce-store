const productDB = require("../models/ProductModal");

// addProduct
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

// getAllProducts also getProducts By category
const getProducts = ({ search }) => {
    const keyword = search
        ? {
              category: {
                  $regex: search,
                  $options: "i",
              },
          }
        : {};
    return new Promise(async (resolve, reject) => {
        try {
            const products = await productDB.find({ ...keyword });
            resolve(products);
        } catch (error) {
            reject({
                code: 500,
                message: error,
            });
        }
    });
};

// comments product
const comments = (name, text, productId, _id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await productDB.findById(productId);
            const newComments = {
                user: _id,
                text: text,
                name: name,
            };
            product.comments.unshift(newComments);
            await product.save();
            resolve(product.comments);
        } catch (error) {
            reject({
                code: 500,
                message: error,
            });
        }
    });
};

// delete Product
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await productDB.findById(id);
            if (!product) {
                return reject({
                    code: 404,
                    message: "product not found...",
                });
            }
            const response = productDB.findByIdAndRemove(id);

            resolve(response);
        } catch (error) {
            return reject({
                code: 500,
                message: error,
            });
        }
    });
};

module.exports = {
    addProduct,
    getProducts,
    comments,
    deleteProduct,
};
