const vacancyRepository = require("../repositories/vacancieRepository");

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
}

module.exports = new VacancyService();
