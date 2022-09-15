const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "secret";

const passwordHashing = (password) => bcrypt.hashSync(password);
const passwordComparing = (password, hash) =>
  bcrypt.compareSync(password, hash);

const signToken = (payload) => jwt.sign(payload, secretKey);
const verifyToken = (access_token) => jwt.verify(access_token, secretKey);

module.exports = { passwordHashing, passwordComparing, signToken, verifyToken };
