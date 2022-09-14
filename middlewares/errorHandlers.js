const errorHandlers = async (err, req, res, next) => {
  console.log(err);
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError" || err.name === "400") {
    res.status(400).json({
      statusCode: 400,
      message: err.errors[0].message,
    });
  } else if (err.name === "SequelizeDatabaseError" || err.name === "SequelizeForeignKeyConstraintError") {
    res.status(400).json({
      statusCode: 400,
      message: "Invalid input",
    });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      statusCode: 401,
      message: "(Invalid Token) Login Needed",
    });
  } else if (err.name === "404") {
    res.status(404).json({
      statusCode: 404,
      message: `${err.data} Not Found`,
    });
  } else if (err.name === "InvalidCredential") {
    res.status(401).json({
      statusCode: 401,
      message: "Invalid email or password",
    });
  } else if (err.name === "401") {
    res.status(401).json({
      statusCode: 401,
      message: "Login needed",
    });
  } else if (err.name === "403") {
    res.status(403).json({
      statusCode: 403,
      message: "This action need authorization",
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = errorHandlers;
