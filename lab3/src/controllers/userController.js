const vacancyService = require("../services/vacancyService.js");

const getHome = (req, res) => {
  res.render("home", { title: "Головна сторінка" });
};

const getVacancies = async (req, res) => {
  try {
    const vacancies = await vacancyService.getAllVacancies();
    res.render("vacancies", { title: "Всі вакансії", vacancies });
  } catch (error) {
    res.render("error", { message: "Помилка при завантаженні вакансій" });
  }
};

const getVacancyDetails = async (req, res) => {
  try {
    const vacancy = await vacancyService.getVacancyById(req.params.id);
    if (!vacancy) {
      return res.render("error", { message: "Вакансію не знайдено" });
    }
    res.render("vacancy-details", { title: vacancy.title, vacancy });
  } catch (error) {
    res.render("error", { message: "Помилка завантаження деталей вакансії" });
  }
};

const searchVacancies = async (req, res) => {
  try {
    const { keyword } = req.query;
    const results = await vacancyService.searchVacancies(keyword);
    res.render("search-results", {
      title: "Результати пошуку",
      vacancies: results,
      query: keyword,
    });
  } catch (error) {
    res.render("error", { message: "Помилка під час пошуку" });
  }
};

module.exports = {
  getHome,
  getVacancies,
  getVacancyDetails,
  searchVacancies,
};
