const vacancyService = require("../services/vacancyService");

const getAdminPanel = async (req, res) => {
  try {
    const vacancies = await vacancyService.getAllVacancies();
    res.render("admin-panel", { title: "Панель адміністратора", vacancies });
  } catch (error) {
    res.status(500).render("error", { title: "Помилка", message: "Не вдалося завантажити панель" });
  }
};

const getCreateVacancyForm = (req, res) => {
  res.render("create-vacancy", { title: "Створити вакансію" });
};

const createVacancy = async (req, res) => {
  try {
    await vacancyService.createVacancy(req.body);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).render("error", { title: "Помилка", message: "Не вдалося створити вакансію" });
  }
};

const getEditVacancyForm = async (req, res) => {
  try {
    const vacancy = await vacancyService.getVacancyById(req.params.id);
    if (vacancy.requirements) {
      vacancy.requirementsString = vacancy.requirements.join(', ');
    }
    res.render("edit-vacancy", { title: "Редагувати вакансію", vacancy });
  } catch (error) {
    res.status(404).render("error", { title: "Помилка", message: "Вакансію не знайдено" });
  }
};

const updateVacancy = async (req, res) => {
  try {
    await vacancyService.updateVacancy(req.params.id, req.body);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).render("error", { title: "Помилка", message: "Не вдалося оновити вакансію" });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    await vacancyService.deleteVacancy(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).render("error", { title: "Помилка", message: "Не вдалося видалити вакансію" });
  }
};

module.exports = {
  getAdminPanel,
  getCreateVacancyForm,
  createVacancy,
  getEditVacancyForm,
  updateVacancy,
  deleteVacancy
};
