const jwt = require('jsonwebtoken');
const {User, News} = require('../models/index');

const authentication = async (req, res, next) => {    
    try {
        const {access_token} = req.headers
        if (!access_token) {
            throw {name: `Token Invalid`}
        }
        const validToken = jwt.verify(access_token, process.env.SECRET)
        if (!validToken) {
            throw {name: `Token Invalid`}
        }
        const data = await User.findByPk(validToken.id)
        if (!data) {
            throw {name: `Token Invalid`}
        }
        req.user = {
            id: data.id,
            role: data.role,
            email: data.email
        }
        next()
    } catch (err) {
        next(err)
    }
}

const authorization = async (req, res, next) => {
    try {
        const {id} = req.params //validasi
        const {id: userId, role} = req.user
        const data = await News.findByPk(id)
        if (!data) {
            throw {name: `Not Found`}
        }
        if (role === `Admin`) {
            next()
        }else if (role === `Staff`){
            if(data.authorId !== userId){
                throw {name: `Forbidden`}
            } else {
                next()
            }
        }
    } catch (err) {
        next(err)
    }
}

const authorization2 = async (req, res, next) => {
    try {
        const {id} = req.params //validasi
        const {id: userId, role} = req.user
        const data = await News.findByPk(id)
        if (!data) {
            throw {name: `Not Found`}
        }
        if (role === `Admin`) {
            next()
        }
    } catch (err) {
        next(err)
    }
}
module.exports = {authentication, authorization, authorization2}