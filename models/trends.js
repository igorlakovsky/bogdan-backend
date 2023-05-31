const Games = require('./games.js')

const { DataTypes } = require('sequelize')
const db = require('../db.js')

const Trends = db.define('trends',
  {
    trend_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

Trends.hasOne(Games, { onDelete: "cascade"});

module.exports = Trends