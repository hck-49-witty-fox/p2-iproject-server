const { passCompare, tokenSign } = require('../helpers/helpers');
const { User } = require('../models');

class UserController {
  //LOGIN-HANDLER---------
  static async loginHandler(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) throw { name: 'Unauthorized' };

      const findUser = await User.findOne({
        where: { username },
      });

      if (!findUser) throw { name: 'Unauthorized' };

      const isValid = passCompare(password, findUser.password);
      if (!isValid) throw { name: 'Unauthorized' };

      const payload = {
        id: findUser.id,
      };
      const access_token = tokenSign(payload);

      res.status(200).json({
        access_token,
        username: findUser.username,
        name: findUser.firstName,
        fullName: findUser.firstName + ' ' + findUser.lastName,
      });
    } catch (err) {
      next(err);
    }
  }

  //REGISTER-HANDLER
  static async registerHandler(req, res, next) {
    try {
      const { email, password } = req.body;

      const data = await User.create({
        email,
        password,
      });

      res.status(201).json({
        id: data.id,
        email: data.email,
      });
    } catch (err) {
      console.log(err);
    }
  }

  //GET-USER-WITH-THREAD
  static async getUserWithThread(req, res, next) {
    try {
      const data = await User.findAll({
        include: ['Threads'],
      });

      res.status(200).json({
        statusCode: 200,
        message: 'Successfully read data',
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
