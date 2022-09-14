'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Thread);
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Username must be unique!',
        },
        validate: {
          notEmpty: {
            msg: 'Username is required!',
          },
          notNull: {
            msg: 'Username is required!',
          },
        },
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'First Name is required!',
          },
          notNull: {
            msg: 'First Name is required!',
          },
        },
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Last Name is required!',
          },
          notNull: {
            msg: 'Last Name is required!',
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password is required!',
          },
          notNull: {
            msg: 'Password is required!',
          },
        },
      },
    },

    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
