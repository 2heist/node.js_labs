const gameService = require("../services/gameService.js");

const getSchedule = async (req, res) => {
  try {
    const games = await gameService.getAllGames();
    res.render("schedule", { title: "Розклад змагань", games });
  } catch (error) {
    res.status(500).send("Помилка при отриманні розкладу");
  }
};

const searchTeam = async (req, res) => {
  try {
    const { teamName } = req.query;
    const results = await gameService.searchGamesByTeam(teamName);
    res.render("search-results", {
      title: "Результати пошуку",
      results,
      teamName,
    });
  } catch (error) {
    res.status(500).send("Помилка під час пошуку команди");
  }
};

module.exports = {
  getSchedule,
  searchTeam,
};
