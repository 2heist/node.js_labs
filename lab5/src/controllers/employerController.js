const vacancyService = require("../services/vacancyService");

const getAdminPanel = async (req, res) => {
  try {
    const rawVacancies = await vacancyService.getAllVacancies();
    const vacancies = rawVacancies.map((v) => v.dataValues);
    res.render("admin-panel", { title: "Панель адміністратора", vacancies });
  } catch (error) {
    res.status(500).render("error", {
      title: "Помилка",
      message: "Не вдалося завантажити панель",
    });
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
    res.status(500).render("error", {
      title: "Помилка",
      message: "Не вдалося створити вакансію",
    });
  }
};

const getEditVacancyForm = async (req, res) => {
  try {
    const vacancy = await vacancyService.getVacancyById(req.params.id);
    if (vacancy && vacancy.requirements) {
      vacancy.requirementsString = vacancy.requirements.join(", ");
    }
    res.render("edit-vacancy", { title: "Редагувати вакансію", vacancy });
  } catch (error) {
    res
      .status(404)
      .render("error", { title: "Помилка", message: "Вакансію не знайдено" });
  }
};

const updateVacancy = async (req, res) => {
  try {
    await vacancyService.updateVacancy(req.params.id, req.body);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).render("error", {
      title: "Помилка",
      message: "Не вдалося оновити вакансію",
    });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    await vacancyService.deleteVacancy(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).render("error", {
      title: "Помилка",
      message: "Не вдалося видалити вакансію",
    });
  }
};

const duplicateVacancy = async (req, res) => {
  try {
    await vacancyService.duplicateVacancy(req.params.id); // реалізувати метод дублювання вакансії в сервісі
    res.redirect("/admin");
  } catch (error) {
    res.status(500).render("error", {
      title: "Помилка транзакції",
      message: "Не вдалося здублювати вакансію",
    });
  }
};

module.exports = {
  getAdminPanel,
  getCreateVacancyForm,
  createVacancy,
  getEditVacancyForm,
  updateVacancy,
  deleteVacancy,
  duplicateVacancy,
};
