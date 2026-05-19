//старий шаблон з лаб 4

const pool = require("../../database/db");

class VacancyRepository {
  async getAll(keyword = '') {
    const query = `
      SELECT id, title, company, salary, description 
      FROM vacancies 
      WHERE title ILIKE $1 OR description ILIKE $1 
      ORDER BY id DESC;
    `;
    const result = await pool.query(query, [`%${keyword}%`]);
    return result.rows;
  }

  async getById(id) {
    const vacancyQuery = 'SELECT * FROM vacancies WHERE id = $1;';
    const vacancyResult = await pool.query(vacancyQuery, [id]);
    const vacancy = vacancyResult.rows[0];

    if (vacancy) {
      const reqQuery = 'SELECT requirement FROM requirements WHERE vacancy_id = $1;';
      const reqResult = await pool.query(reqQuery, [id]);
      vacancy.requirements = reqResult.rows.map(row => row.requirement);
    }

    return vacancy;
  }

  async create(vacancyData, requirementsArray) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const insertVacancyQuery = `
        INSERT INTO vacancies (title, company, salary, description)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `;
      const vacancyValues = [
        vacancyData.title, 
        vacancyData.company || 'Не вказано', 
        vacancyData.salary || '', 
        vacancyData.description || ''
      ];
      const vacancyResult = await client.query(insertVacancyQuery, vacancyValues);
      const newVacancyId = vacancyResult.rows[0].id;

      if (requirementsArray.length > 0) {
        const insertReqQuery = 'INSERT INTO requirements (vacancy_id, requirement) VALUES ($1, $2);';
        for (const req of requirementsArray) {
          await client.query(insertReqQuery, [newVacancyId, req]);
        }
      }

      await client.query('COMMIT');
      return newVacancyId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async update(id, vacancyData, requirementsArray) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const updateVacancyQuery = `
        UPDATE vacancies 
        SET title = $1, company = $2, salary = $3, description = $4 
        WHERE id = $5;
      `;
      const vacancyValues = [
        vacancyData.title, 
        vacancyData.company || 'Не вказано', 
        vacancyData.salary || '', 
        vacancyData.description || '', 
        id
      ];
      await client.query(updateVacancyQuery, vacancyValues);

      await client.query('DELETE FROM requirements WHERE vacancy_id = $1;', [id]);
      
      if (requirementsArray.length > 0) {
        const insertReqQuery = 'INSERT INTO requirements (vacancy_id, requirement) VALUES ($1, $2);';
        for (const req of requirementsArray) {
          await client.query(insertReqQuery, [id, req]);
        }
      }

      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async delete(id) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      await client.query('DELETE FROM requirements WHERE vacancy_id = $1;', [id]);
      await client.query('DELETE FROM vacancies WHERE id = $1;', [id]);
      
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = new VacancyRepository();