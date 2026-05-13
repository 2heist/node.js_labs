const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/vacancies.json');

class VacancyRepository {
  getAllSync() {
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getAllCallback(callback) {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        return callback(err, null);
      }
      try {
        const vacancies = JSON.parse(data);
        callback(null, vacancies);
      } catch (parseError) {
        callback(parseError, null);
      }
    });
  }

  getAllPromise() {
    return fsPromises.readFile(dataPath, 'utf8')
      .then(data => JSON.parse(data))
      .catch(error => {
        throw error;
      });
  }

  // use this
  async getAllAsyncAwait() {
    try {
      const data = await fsPromises.readFile(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new VacancyRepository();