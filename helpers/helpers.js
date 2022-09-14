const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'secretKey10';

const passHash = pass => bcrypt.hashSync(pass, 10);
const passCompare = (pass, hash) => bcrypt.compareSync(pass, hash);

const tokenSign = payload => jwt.sign(payload, secretKey); // alias access_token
const tokenVerify = token => jwt.verify(token, secretKey);

module.exports = { passHash, passCompare, tokenSign, tokenVerify };
