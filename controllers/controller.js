const { User, Profile, Match, Hobby, UserHobby } = require("../models");
const { payloadToToken, tokenToPayload, hashPassword, comparePassword } = require("../helpers/helper");
const firebase = require("firebase/compat/app");
const { getDatabase, ref, set } = require("firebase/compat/database");

const firebaseConfig = {
  apiKey: "AIzaSyD-aH-_KeQbgoNBxwo2IFb-Uu0GO2ijH4U",
  authDomain: "chatipro.firebaseapp.com",
  databaseURL: "https://chatipro-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatipro",
  storageBucket: "chatipro.appspot.com",
  messagingSenderId: "347476096492",
  appId: "1:347476096492:web:3516c526a7e26a367cbcc9",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

class Controller {
  static async registerToFirebase(req, res, next) {
    try {
      const { username, email, password } = req.body;
      let datamessages = [];

      const messagesRef = app.database().ref("messages");

      new Promise((resolve, reject) => {
        messagesRef.on("value", (snapshot) => {
          const data = snapshot.val();
          let messages = [];
          Object.keys(data).forEach((key) => {
            messages.push({
              id: key,
              username: data[key].username,
              content: data[key].content,
            });
          });
          datamessages = messages;
          resolve();
        });
      }).then((data) => {
        console.log("gfff", datamessages);
      });
    } catch (error) {
      next(error);
    }
  }

  static async cobaRegister(req, res, next) {
    try {
      let { username, email, password } = req.body;
      password = hashPassword(password);

      const usersRef = app.database().ref("Users");
      usersRef.push({ username, email, password });
    } catch (error) {
      next(error);
    }
  }

  static async writeUser(req, res, next) {
    try {
      let { username, email, password } = req.body;
      password = hashPassword(password);

      const db = getDatabase;
      const reference = ref(db, "users/" + username);

      set(reference, {
        username: username,
        email: email,
        password: password,
      });
    } catch (error) {
      next(error);
    }
  }

  //   static async register(req, res, next) {
  //     try {
  //       const { username, email, password } = req.body;
  //       const registeredUser = User.create({ email, password });
  //       res.status(201).json({
  //         message: "Register Success",
  //         id: registeredUser.id,
  //         username: registeredUser.username,
  //         email: registeredUser.email,
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  //   static async login(req, res, next) {
  //     try {
  //       const { email, password } = req.body;
  //       const userLoggedIn = User.findOne({ where: { email } });
  //       if (!userLoggedIn) {
  //         throw { name: "InvalidCredential" };
  //       }
  //       const rightPassword = hashPassword(password, userLoggedIn.password);
  //       if (!rightPassword) {
  //         throw { name: "InvalidCredential" };
  //       }
  //       const payload = {
  //         id: userLoggedIn.id,
  //       };
  //       const access_token = payloadToToken(access_token);
  //       res.status(200).json({
  //         access_token: access_token,
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  //   static async postProfile(req, res, next) {
  //     try {
  //       const { firstname, lastname, address, location, gender, weight, height, phonenumber, birthdate } = req.body;
  //       const { id: UserId } = req.user;
  //       const createdProfile = Profile.create({ firstname, lastname, address, location, gender, weight, height, phonenumber, birthdate, UserId });
  //       res.status(200).json(createdProfile);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  //   static async getProfile(req, res, next) {
  //     try {
  //       const { userId: UserId } = req.params;
  //       const findProfile = Profile.findOne({ where: { UserId } });
  //       if (!findProfile) {
  //         throw { name: "404", data: "User" };
  //       }
  //       res.status(200).json(findProfile);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  //   static async putProfile(req, res, next) {
  //     try {
  //       const { firstname, lastname, address, location, gender, weight, height, phonenumber, birthdate } = req.body;
  //       const { userId: UserId } = req.params;
  //       const updatedProfile = Profile.update({ firstname, lastname, address, location, gender, weight, height, phonenumber, birthdate }, { where: { UserId } });
  //       res.status(200).json({
  //         message: "Update success",
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  //   //ALL PROFILE
  //   static async getAllProfiles(req, res, next) {
  //     try {
  //       const allProfiles = Profile.findAll({
  //         include: User,
  //       });
  //       res.status(200).json(allProfiles);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  //   static async postHobbies(req, res, next) {
  //     try {
  //       const { name } = req.body;
  //       const createdHobby = Hobby.create({ name });
  //       res.status(200).json(createdHobby);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  //   static async getHobbies(req, res, next) {
  //     try {
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}

module.exports = Controller;
