//старий шаблон з лаб 4

const vacancyService = require("../services/vacancyService");

const getHomePage = (req, res) => {
  res.render("home", { title: "Головна" });
};

const getVacancies = async (req, res) => {
  try {
    const vacancies = await vacancyService.getAllVacancies();
    res.render("vacancies", { title: "Всі вакансії", vacancies });
  } catch (error) {
    res.status(500).render("error", { title: "Помилка", message: "Не вдалося завантажити вакансії" });
  }
};

const getVacancyDetails = async (req, res) => {
  try {
    const vacancy = await vacancyService.getVacancyById(req.params.id);
    res.render("vacancy-details", { title: vacancy.title, vacancy });
  } catch (error) {
    res.status(404).render("error", { title: "Помилка", message: "Вакансію не знайдено" });
  }
};

const searchVacancies = async (req, res) => {
  try {
    const { keyword } = req.query;
    const results = await vacancyService.getAllVacancies(keyword);
    res.render("search-results", { title: "Результати пошуку", vacancies: results, keyword });
  } catch (error) {
    res.status(500).render("error", { title: "Помилка", message: "Помилка під час пошуку" });
  }
};

module.exports = {
  getHomePage,
  getVacancies,
  getVacancyDetails,
  searchVacancies
};
