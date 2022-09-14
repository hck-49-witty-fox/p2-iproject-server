const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const payloadToToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET);
const tokenToPayload = (token) => jwt.verify(token, process.env.JWT_SECRET);

const hashPassword = (password) => bcrypt.hashSync(password);
const comparePassword = (password, hashing) => bcrypt.compareSync(password, hashing);

module.exports = { payloadToToken, tokenToPayload, hashPassword, comparePassword };
