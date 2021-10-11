const UserDB = require("../models/UserDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a User
const registerUser = ({ name, email, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!name || !email || !password) {
                return reject({
                    code: 400,
                    message: "Bad request, check parameters...",
                });
            }

            if (!_validateEmail(email)) {
                return reject({
                    code: 400,
                    message: "Invalid email address...",
                });
            }

            if (!_validatePassword(password)) {
                return reject({
                    code: 400,
                    message: "Password too short...",
                });
            }

            const userExists = await UserDB.findOne({ email }).exec();
            if (userExists) {
                return reject({
                    code: 409,
                    message: "User already exists...",
                });
            }

            const newUser = new UserDB({
                name: name,
                email: email,
                password: password,
            });

            // Generate Hash Password & Save
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);

            // save user to database
            await newUser.save();

            // JWT Token
            const payload = {
                user: {
                    id: newUser._id,
                },
            };

            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
                expiresIn: 360000,
            });
            newUser.token = token;
            resolve(newUser);
        } catch (err) {
            reject({
                code: 500,
                message: err,
            });
        }
    });
};

const _validateEmail = (email) => {
    const validEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validEmail);
};

const _validatePassword = (password) => {
    return password.length >= 6;
};

// Login a User
const loginUser = ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await UserDB.findOne({ email });

            if (!user) {
                return reject({
                    code: 400,
                    message: "Invalid email address...",
                });
            }
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordMatch) {
                return reject({
                    code: 400,
                    message: "Invalid email or password...",
                });
            }

            user = JSON.parse(JSON.stringify(user));

            // JWT Token
            jwt.sign(
                user,
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "10h",
                },
                (error, token) => {
                    if (error) {
                        throw error;
                    } else {
                        user.token = token;
                        resolve({ user });
                    }
                }
            );
        } catch (error) {
            reject({
                code: 500,
                message: error,
            });
        }
    });
};

// Update a User
const updateUser = (name, email, password, id) => {
    return new Promise(async (resolve, reject) => {
        const allFields = {};

        if (name) {
            allFields.name = name;
        }
        if (email) {
            allFields.email = email;
        }
        if (password) {
            allFields.password = password;
        }
        try {
            const query = {
                _id: id,
            };

            const user = await UserDB.findOne(query).exec();
            if (!user) {
                return reject({
                    code: 404,
                    messsage: "Contact not found...",
                });
            }
            const response = await UserDB.findOneAndUpdate(
                id,
                { $set: allFields },
                { new: true }
            );
            resolve(response);
        } catch (error) {
            reject({
                code: 500,
                message: error,
            });
        }
    });
};

// delete a User
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserDB.findById(id);
            if (!user) {
                return reject({
                    code: 404,
                    message: "Account not found...",
                });
            }
            const response = UserDB.findByIdAndRemove(id);
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
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
};
