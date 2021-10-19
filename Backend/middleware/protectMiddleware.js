const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // Authorization header
    const token = req.header("x-access-token");

    if (!token) {
        return res
            .status(403)
            .json({ message: "Token is required for authentication..." });
    }

    // if token available
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token...");
    }
    return next();
};



module.exports = verifyToken
