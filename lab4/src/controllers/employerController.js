const vacancyService = require("../services/vacancyService.js");

const getAdminPanel = async (req, res) => {
  try {
    const vacancies = await vacancyService.getAllVacancies();
    res.render("admin-panel", { title: "Панель роботодавця", vacancies });
  } catch (error) {
    res.render("error", { message: "Помилка завантаження панелі" });
  }
};

const getCreateForm = (req, res) => {
  res.render("create-vacancy", { title: "Створення нової вакансії" });
};

const createVacancy = async (req, res) => {
  try {
    await vacancyService.createVacancy(req.body);
    res.redirect("/admin");
  } catch (error) {
    res.render("error", { message: "Не вдалося створити вакансію" });
  }
};

const getEditForm = async (req, res) => {
  try {
    const vacancy = await vacancyService.getVacancyById(req.params.id);
    if (!vacancy) {
      return res.render("error", {
        message: "Вакансію для редагування не знайдено",
      });
    }
    res.render("edit-vacancy", { title: "Редагування вакансії", vacancy });
  } catch (error) {
    res.render("error", { message: "Помилка завантаження форми редагування" });
  }
};

const updateVacancy = async (req, res) => {
  try {
    await vacancyService.updateVacancy(req.params.id, req.body);
    res.redirect("/admin");
  } catch (error) {
    res.render("error", { message: "Не вдалося оновити вакансію" });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    await vacancyService.deleteVacancy(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    res.render("error", { message: "Помилка при видаленні вакансії" });
  }
};

module.exports = {
  getAdminPanel,
  getCreateForm,
  createVacancy,
  getEditForm,
  updateVacancy,
  deleteVacancy,
};
