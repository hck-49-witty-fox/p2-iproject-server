const { Thread, User } = require('../models/');

const axios = require('axios');

class ThreadController {
  static async getThread(req, res, next) {
    try {
      const data = await Thread.findAll({
        include: ['User'],
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

  static async getThreadById(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Thread.findOne({
        where: { id },
        include: [
          {
            model: User,
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
          },
        ],
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

  static async getTechNews(req, res, next) {
    try {
      const options = {
        method: 'GET',
        url: 'https://newsapi.org/v2/top-headlines',
        params: { sources: 'techcrunch' },
        headers: {
          'X-Api-Key': '8e30a36e57414f8f8aa49b4442b16121',
        },
      };
      const { data } = await axios.request(options);

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

module.exports = ThreadController;
