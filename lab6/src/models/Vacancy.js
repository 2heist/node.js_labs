const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const Vacancy = sequelize.define("Vacancy", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  company: {
    type: DataTypes.STRING,
    allowNull: false
  },

  salary: {
    type: DataTypes.STRING
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Vacancy;