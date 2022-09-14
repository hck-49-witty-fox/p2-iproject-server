const errorHandler = (err, req, res, next) => {
  try {
    let code = 500;
    let msg = 'Internal Server Error';

    if (err.name === 'Unauthorized') {
      code = 401;
      msg = 'Invalid email/password';
    } else if (
      err.name === 'SequelizeValidationError' ||
      'SequelizeUniqueConstraintError'
    ) {
      code = 400;
      msg = err.errors[0].message;
    } else if (err.name === 'Not Found') {
      code = 404;
      msg = 'Thread not found';
    }

    res.status(code).json({
      message: msg,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = errorHandler;
