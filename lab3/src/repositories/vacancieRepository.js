const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/vacancies.json');

class VacancyRepository {

  // 1. Синхронний
  getAllSync() {
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  // 2. Асинхронний з callback
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

  // 3. Асинхронний з Promise
  getAllPromise() {
    return fsPromises.readFile(dataPath, 'utf8')
      .then(data => JSON.parse(data))
      .catch(error => {
        throw error;
      });
  }

  async getAllAsyncAwait() {
    try {
      const data = await fsPromises.readFile(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  // Допоміжний метод для збереження змін у файл
  async saveAll(vacancies) {
    await fsPromises.writeFile(dataPath, JSON.stringify(vacancies, null, 2), 'utf8');
  }

  async getAll() {
    return await this.getAllAsyncAwait(); 
  }

  async getById(id) {
    const vacancies = await this.getAll();
    return vacancies.find(v => v.id == id);
  }

  async create(vacancyData) {
    const vacancies = await this.getAll();
    const newVacancy = {
      id: Date.now().toString(),
      title: vacancyData.title,
      company: vacancyData.company,
      salary: vacancyData.salary,
      description: vacancyData.description,
      requirements: vacancyData.requirements ? vacancyData.requirements.split(',').map(r => r.trim()) : []
    };
    
    vacancies.push(newVacancy);
    await this.saveAll(vacancies);
    return newVacancy;
  }

  async update(id, vacancyData) {
    const vacancies = await this.getAll();
    const index = vacancies.findIndex(v => v.id == id);
    
    if (index !== -1) {
      vacancies[index] = {
        ...vacancies[index],
        title: vacancyData.title,
        company: vacancyData.company,
        salary: vacancyData.salary,
        description: vacancyData.description,
        requirements: vacancyData.requirements ? 
          (typeof vacancyData.requirements === 'string' ? vacancyData.requirements.split(',').map(r => r.trim()) : vacancyData.requirements) 
          : []
      };
      await this.saveAll(vacancies);
      return vacancies[index];
    }
    return null;
  }

  async delete(id) {
    let vacancies = await this.getAll();
    vacancies = vacancies.filter(v => v.id != id);
    await this.saveAll(vacancies);
  }
}

module.exports = new VacancyRepository();