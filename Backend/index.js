const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

// MongoDB Connection
const connect_DB = async () => {
    const URI =
        "mongodb+srv://helloe9ine:e9ineFirstApp7778@cluster0.z1s41.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
    } catch (err) {
        console.log(err);
    }
};
connect_DB();

// Init Middleware
app.use(express.json({ extended: false }));

// cors
app.use(cors());

// config env
dotenv.config();

// Routes
app.use("/user", require("./routes/users"));

// app listen
const PORT = process.env.PORT || "5000";
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
