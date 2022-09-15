const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
const app = express();
const port = 3000;
const axios = require("axios");
let jwt = require("jsonwebtoken");
const { User } = require("./models");
const {
  passwordComparing,
  signToken,
  verifyToken,
} = require("./helpers/helper");
const { Playlist } = require("./models");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const data = await User.create({ email, password });

    res.status(201).json({
      id: data.id,
      email,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw { name: "User not found" };
    }

    if (!passwordComparing(password, user.password)) {
      throw { name: "User not found" };
    }

    const payload = {
      id: user.id,
    };

    const access_token = signToken(payload);

    res.status(200).json({
      access_token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.post("/googleLogin", async (req, res, next) => {
  console.log("masuk");
  try {
    let google_token = req.headers.google_token;
    const client = new OAuth2Client(
      "851325068562-p1clsgekdqh72k5ct6elgaq18qhjcduj.apps.googleusercontent.com"
    );
    const ticket = await client.verifyIdToken({
      idToken: google_token,
      audience:
        "851325068562-p1clsgekdqh72k5ct6elgaq18qhjcduj.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    console.log(ticket, "><><><><>");
    const payload = ticket.getPayload();
    console.log(payload);
    // console.log(payload);
    let [data, create] = await User.findOrCreate({
      where: {
        email: payload.email,
      },
      defaults: {
        email: payload.email,
        password: "12345",
      },
      hooks: false,
    });

    // console.log(data.email, ">>>>>");

    let userId = {
      id: data.id,
      email: data.email,
    };

    let access_token = jwt.sign(userId, "secret");
    // console.log(access_token, ">>>>>");
    if (create) {
      res.status(201).json({
        statusCode: 201,
        access_token,
        email: data.email,
        message: `Account has been created succesfully!`,
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        access_token,
        email: data.email,
        status: `Login success`,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.get("/games", async (req, res, next) => {
  try {
    let { page, page_size, search, ordering } = req.query;
    if (search) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?search=${search}&key=5ebe1ce7f8aa4067854e32c15c7cdc56`
      );
      res.status(200).json({ ...response.data });
    } else if (ordering) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?ordering=${ordering}&key=5ebe1ce7f8aa4067854e32c15c7cdc56`
      );
      res.status(200).json({ ...response.data });
    } else {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=5ebe1ce7f8aa4067854e32c15c7cdc56`
      );
      res.status(200).json({ ...response.data });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.get("/games/detail/:id", async (req, res) => {
  try {
    let id = +req.params.id;
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=5ebe1ce7f8aa4067854e32c15c7cdc56`
    );
    res.status(200).json({ ...response.data });
  } catch (error) {
    console.log(error);
  }
});

app.get("/games/detail/:id", async (req, res) => {
  try {
    let id = +req.params.id;
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=5ebe1ce7f8aa4067854e32c15c7cdc56`
    );
    res.status(200).json({ ...response.data });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    let payload = verifyToken(access_token);
    let dataUser = await User.findByPk(payload.id);
    if (!dataUser) {
      throw { name: "Invalid access_token" };
    }
    console.log(dataUser);

    req.user = {
      id: dataUser.id,
      email: dataUser.email,
    };

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.post("/playlist/:id", async (req, res, next) => {
  try {
    console.log(req.user.id);
    let id = +req.params.id;
    console.log(id);
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=5ebe1ce7f8aa4067854e32c15c7cdc56`
    );
    //   console.log(response.data.id);

    let data = await Playlist.create({
      UserId: req.user.id,
      GameId: response.data.id,
    });
    res.status(201).json({
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.use((err, req, res, next) => {
  try {
    let code = 500;
    let message = "Internal Server Error";

    if (
      err.name === "SequelizeValidationError" ||
      err.name === "SequelizeUniqueConstraintError"
    ) {
      let errors = err.errors.map((el) => {
        return el.message;
      });
      code = 400;
      message = errors;
    } else if (err.name === "User not found") {
      code = 401;
      message = "Invalid Email/Password";
    } else if (
      err.name === "Invalid access_token" ||
      err.name === "JsonWebTokenError"
    ) {
      code = 401;
      message = "Invalid access_token";
    }
    res.status(code).json({
      statusCode: code,
      message: message,
    });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
