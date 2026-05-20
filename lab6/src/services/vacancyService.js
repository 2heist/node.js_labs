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

  async getVacanciesForApi(page = 1, limit = 10, title = '') {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    
    const offset = (parsedPage - 1) * parsedLimit;

    const result = await vacancyRepository.findAllWithFilters(parsedLimit, offset, title);

    return {
      totalItems: result.count,
      totalPages: Math.ceil(result.count / parsedLimit),
      currentPage: parsedPage,
      vacancies: result.rows
    };
  }
}

module.exports = new VacancyService();
