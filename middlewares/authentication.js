const { User } = require("../models");
const { tokenToPayload } = require("../helpers/helper");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "401" };
    }

    const payload = tokenToPayload(access_token);

    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "401" };
    }
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
