const { Thread } = require('../models/');

class ThreadController {
  static async getThread(req, res, next) {
    try {
      const data = await Thread.findAll();

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
