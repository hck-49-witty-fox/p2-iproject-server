const axios = require('axios');
const {User, Profile} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

class Controller {
    static NearbySearch = async (req, res, next) => {
        try {
            const {lat, lng} = req.query
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=cafe&keyword=coffee&key=${process.env.GAPI_KEY}`
            const response = await axios.get(url)
            const data = response.data.results.map((el, id) => {
                return {
                    id: id + 1,
                    location: el.geometry.location,
                    name: el.name, 
                    rating: el.rating, 
                    address: el.vicinity
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async handleRegister(req, res, next){
        try {
            if (!req.body) {
             throw {name: `Invalid Input`}   
            }
            const {username, email, password} = req.body
            const data = await User.create({
                username,
                email,
                password
            })
            res.status(201).json({
                message: `User has been created`,
                UserId: data.id
            })
        } catch (err) {
            next(err)
        }
    }

    static async handleProfile(req, res, next){
        try {
            if (!req.body) {
             throw {name: `Invalid Input`}   
            }
            const {fullname, bio, imgUrl, UserId} = req.body
            const data = await Profile.create({
                fullname,
                bio,
                imgUrl,
                UserId
            })
            res.status(201).json({
                message: `User has been created`
            })

        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next){
        try {
            const {email, password} = req.body
            console.log(email, password);
            const data = await User.findOne({
                where: {
                    [Op.or]: {
                        email,
                        username: email
                    } 
                }
            })
            if (!data) {
                throw {name: `Email or Username and Password is Invalid`}
            }
            const validPass = bcrypt.compareSync(password, data.password)
            if (!validPass) {
                throw {name: `Email or Username and Password is Invalid`}
            }
            const payload = {
                id: data.id,
                email: data.email
            }
            const access_token = jwt.sign(payload, process.env.SECRET)
            res.status(200).json({
                access_token,
                username: data.username
            })
        } catch (err) {
            next(err)
        }
    }

    static async loginGoogle (req, res, next){
        try {
            const {google_token} = req.body
            const {OAuth2Client, GoogleAuth} = require('google-auth-library');
            const client = new OAuth2Client(process.env.CLIENT_ID);
            async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            const [row, created] = await User.findOrCreate({
                where: {
                    email: payload.email,
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: `passwordGoogle123`
                },
                hooks: false
            }) 
            const payload2 = {
                id: row.id,
                email: row.email
            }
            const access_token = jwt.sign(payload2, process.env.SECRET)
            res.status(200).json({
                access_token,
                username: row.username
            })
            }
            verify().catch(console.error);
            
        } catch (err) {
            next(err)
        }
        
    }
}

module.exports = Controller