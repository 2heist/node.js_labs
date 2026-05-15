const vacancyRepository = require("../repositories/vacancieRepository");

class VacancyService {
  async getAllVacancies() {
    return await vacancyRepository.getAll();
  }

  async getVacancyById(id) {
    return await vacancyRepository.getById(id);
  }

  async createVacancy(data) {
    return await vacancyRepository.create(data);
  }

  async updateVacancy(id, data) {
    return await vacancyRepository.update(id, data);
  }

  async deleteVacancy(id) {
    return await vacancyRepository.delete(id);
  }

  async searchVacancies(keyword) {
    const vacancies = await vacancyRepository.getAll();
    if (!keyword) return vacancies;

    const lowerKeyword = keyword.toLowerCase();
    return vacancies.filter((v) => {
      const title = (v.title || "").toLowerCase();
      const description = (v.description || "").toLowerCase();
      const company = (v.company || "").toLowerCase();

      return (
        title.includes(lowerKeyword) ||
        description.includes(lowerKeyword) ||
        company.includes(lowerKeyword)
      );
    });
  }
}

module.exports = new VacancyService();
