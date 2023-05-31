const { DataTypes } = require('sequelize')
const db = require('../db.js')

const Home = db.define('home',
  {
    home_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    logo: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  },
  {
    timestamps: false
  }
)

module.exports = Home