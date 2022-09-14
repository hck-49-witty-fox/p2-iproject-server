'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  Thread.init(
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title Name is required!',
          },
          notNull: {
            msg: 'Title Name is required!',
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        // allowNull: false,
        // validate: {
        //   notEmpty: {
        //     msg: 'Content is required!',
        //   },
        //   notNull: {
        //     msg: 'Content is required!',
        //   },
        // },
      },

      imgUrl: DataTypes.STRING,
      UserId: DataTypes.INTEGER,

      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Category is required!',
          },
          notNull: {
            msg: 'Category is required!',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Thread',
    }
  );
  return Thread;
};
