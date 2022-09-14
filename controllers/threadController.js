const { Thread, User } = require('../models/');

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
}

module.exports = ThreadController;
