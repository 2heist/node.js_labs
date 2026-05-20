const vacancyService = require('../../../../lab5/src/services/vacancyService');

class VacancyApiController {
  // GET
  async getAll(req, res, next) {
    try {
      const { page, limit, title } = req.query;
      const data = await vacancyService.getVacanciesForApi(page, limit, title);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // GET
  async getById(req, res, next) {
    try {
      const vacancy = await vacancyService.getVacancyById(req.params.id);
      if (!vacancy) {
        return res.status(404).json({ message: 'Вакансію не знайдено' });
      }
      res.status(200).json(vacancy);
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  async deleteVacancy(req, res, next) {
    try {
      const deleted = await vacancyService.deleteVacancy(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Вакансію не знайдено' }); 
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }