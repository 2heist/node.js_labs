const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/games.json');

class GameRepository {
  static getAllGamesSync() {
    try{
      const rawData = fs.readFileSync(dataPath, 'utf-8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error('Помилка синхронного читання:', error);
      return []; //empty array in case of error
    }
  }

  static getAllGamesCallback(callback) {
    fs.readFile(dataPath, 'utf-8', (err, rawData) => {
      if (err) {
        return callback(err, null);
      }
      
      try {
        const games = JSON.parse(rawData);  

        callback(null, games);
      } catch (parseError) {
        callback(parseError, null);
      }
    });
  }

  static getAllGamesPromise() {
    return fsPromises.readFile(dataPath, 'utf-8')
      .then( rawData => {
        return JSON.parse(rawData);
      })
      .catch(error => {
        console.error("Promise reading mistake")
        throw error;
      });
  }

  static async getAllGamesAsyncAwait() {
    try {
      const rawData = await fsPromises.readFile(dataPath, 'utf-8');
      
      return JSON.parse(rawData);
    } catch (error) {
      console.error('Помилка async/await читання:', error);
      throw error;
    }
  }
}

module.exports = GameRepository;