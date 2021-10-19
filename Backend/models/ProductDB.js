const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    date: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
