const pool = require("../../database/db");

async function getAllVacancies() {

    const result = await pool.query(
        "SELECT * FROM vacancies"
    );

    return result.rows;
}

module.exports = {
    getAllVacancies
};