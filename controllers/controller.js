const axios = require("axios");
const { User, Match } = require("../models");
const { payloadToToken, hashPassword, comparePassword } = require("../helpers/helper");
const theMailer = require("../helpers/nodemailer");
const GetLocation = require("location-by-ip");
const Op = require("sequelize").Op;

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, fullname, gender, birthyear, imgUrl } = req.body;
      let location = "";

      const getLocation = await new GetLocation(process.env.SPOTT_API_KEY);
      const loc = await getLocation.byMyIp();
      location = loc.name;

      const registeredUser = await User.create({ username, email, password, fullname, gender, birthyear, location, imgUrl });
      // CALL NODEMAILER-- COMMENT DULU KALO MAU COBA REGISTER //
      theMailer(email);

      res.status(201).json({
        message: "Register Success",
        id: registeredUser.id,
        username: registeredUser.username,
        email: registeredUser.email,
        location: registeredUser.location,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userLoggedIn = await User.findOne({ where: { email } });
      if (!userLoggedIn) {
        throw { name: "InvalidCredential" };
      }
      const rightPassword = hashPassword(password, userLoggedIn.password);
      if (!rightPassword) {
        throw { name: "InvalidCredential" };
      }
      const payload = {
        id: userLoggedIn.id,
      };
      const access_token = payloadToToken(payload);
      res.status(200).json({
        access_token: access_token,
        username: userLoggedIn.username,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loveCalculate(req, res, next) {
    try {
      const { username: fname } = req.params;
      const { username: sname } = req.user;
      const result = await axios.get("https://love-calculator.p.rapidapi.com/getPercentage", {
        params: { sname: sname, fname: fname },
        headers: {
          "X-RapidAPI-Key": "c061bd9c51msh227937cd442427bp1be0a6jsn905df7c9cdd3",
          "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
        },
      });
      res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const { id } = req.user;
      const allUser = await User.findAll({ where: { id: { [Op.ne]: id } } });
      res.status(200).json(allUser);
    } catch (error) {
      next(error);
    }
  }

  static async postMatch(req, res, next) {
    try {
      const { userId: MatchId } = req.params;
      const { id } = req.user;

      const createMatch = await Match.create({ UserId: id, MatchId, status: "Match" });
      res.status(201).json(createMatch);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
