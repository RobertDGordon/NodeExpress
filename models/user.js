const { DataTypes, Model } = require('sequelize')

let dbConnect = require('../dbConnect')

const sequelizeInstance = dbConnect.Sequelize;

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    // Array of foreign keys, setting to JSON data type
    movie_ids: {
      type: DataTypes.JSON
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: "users",
    timestamps: true,
    freezeTableName: true,
    defaultScope: {
      attributes: { exclude: ["password"]},
    },
    scopes: {
      withPassword: {
        attributes: {}
      }
    }
  }
);

module.exports = User;