const gameService = require("../services/gameService.js");

const getAdminPanel = async (req, res) => {
  try {
    const games = await gameService.getAllGames();
    res.render("admin-panel", { title: "Панель адміністратора", games });
  } catch (error) {
    res.status(500).send("Помилка завантаження адмін-панелі");
  }
};

const createGame = async (req, res) => {
  try {
    await gameService.createGame(req.body);
    res.redirect("/admin");
  } catch (error) {
    res.status(400).send("Не вдалося створити гру");
  }
};

const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { result } = req.body;
    await gameService.updateGameResult(id, result);
    res.redirect("/admin");
  } catch (error) {
    res.status(400).send("Не вдалося оновити результат");
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    await gameService.deleteGame(id);
    res.redirect("/admin");
  } catch (error) {
    res.status(400).send("Помилка при видаленні гри");
  }
};

module.exports = {
  getAdminPanel,
  createGame,
  updateResult,
  deleteGame,
};
