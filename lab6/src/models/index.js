const Vacancy = require("./Vacancy");
const Requirement = require("./Requirement");

Vacancy.hasMany(Requirement, {
  foreignKey: "vacancyId",
  onDelete: "CASCADE"
});

Requirement.belongsTo(Vacancy, {
  foreignKey: "vacancyId"
});

module.exports = {
  Vacancy,
  Requirement
};