const { User } = require("../models");
const { verifyPayload } = require("../helpers/helper");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "401" };
    }

    const payload = verifyPayload(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "401" };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
