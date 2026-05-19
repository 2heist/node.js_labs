const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const Requirement = sequelize.define("Requirement", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Requirement;