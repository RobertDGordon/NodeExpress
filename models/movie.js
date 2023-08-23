const { DataTypes, Model } = require('sequelize')

let dbConnect = require('../dbConnect')

const sequelizeInstance = dbConnect.Sequelize;

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    synopsis: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    image: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: "movies",
    timestamps: true,
    freezeTableName: true
  }
);

module.exports = Movie;