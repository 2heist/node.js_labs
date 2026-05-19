const vacancyRepository = require("../repositories/vacancieRepository");

const sequelize = require("../../database/db");
const Vacancy = require("../models/Vacancy");
const Requirement = require("../models/Requirement");

class VacancyService {
  async getAllVacancies(keyword) {
    return await vacancyRepository.getAll(keyword);
  }

  async getVacancyById(id) {
    const vacancy = await vacancyRepository.getById(id);
    if (!vacancy) {
      throw new Error("Вакансію не знайдено");
    }
    return vacancy;
  }

  async createVacancy(data) {
    let requirementsArray = [];
    if (data.requirements) {
      requirementsArray = data.requirements
        .split(',')
        .map(req => req.trim())
        .filter(req => req.length > 0);
    }
    return await vacancyRepository.create(data, requirementsArray);
  }

  async updateVacancy(id, data) {
    let requirementsArray = [];
    if (data.requirements) {
      requirementsArray = data.requirements
        .split(',')
        .map(req => req.trim())
        .filter(req => req.length > 0);
    }
    return await vacancyRepository.update(id, data, requirementsArray);
  }

  async deleteVacancy(id) {
    return await vacancyRepository.delete(id);
  }

  async duplicateVacancy(id) {
    const t = await sequelize.transaction();
    try {
      const vacancy = await Vacancy.findByPk(id, {
        include: [Requirement],
        transaction: t
      });
      if (!vacancy) throw new Error("Вакансію не знайдено");

      const duplicatedVacancy = await Vacancy.create(
        {
          title: `${vacancy.title} (Copy)`,
          company: vacancy.company,
          salary: vacancy.salary,
          description: vacancy.description
        },
        { transaction: t }
      );

      if (!vacancy.Requirements || vacancy.Requirements.length === 0) {
        throw new Error(
          "Неможливо дублювати вакансію без вимог"
        );
      }

      const requirementsToCreate =
        vacancy.Requirements.map(req => ({
          text: req.text,
          vacancyId: duplicatedVacancy.id
        }));

      await Requirement.bulkCreate(
        requirementsToCreate,
        { transaction: t }
      );

      await t.commit();
      return duplicatedVacancy;

    } catch (error) {
        await t.rollback();
        throw error;
      }
  }
}

module.exports = new VacancyService();
