const pool = require('../config/db');

class VacancyRepository {
  async getAll(keyword = '') {
    const query = `
      SELECT * FROM vacancies 
      WHERE title ILIKE $1 OR description ILIKE $1 
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [`%${keyword}%`]);
    return result.rows;
  }

  async getById(id) {
    const query = 'SELECT * FROM vacancies WHERE id = $1;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async create(data) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
        INSERT INTO vacancies (title, description, requirements, employer_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [data.title, data.description, data.requirements, data.employer_id];
      const result = await client.query(query, values);
      await client.query('COMMIT');
      return result.rows[0];
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  async update(id, data) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
        UPDATE vacancies 
        SET title = $1, description = $2, requirements = $3 
        WHERE id = $4
        RETURNING *;
      `;
      const values = [data.title, data.description, data.requirements, id];
      const result = await client.query(query, values);
      await client.query('COMMIT');
      return result.rows[0];
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  async delete(id) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = 'DELETE FROM vacancies WHERE id = $1 RETURNING id;';
      const result = await client.query(query, [id]);
      await client.query('COMMIT');
      return result.rowCount > 0;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}

module.exports = new VacancyRepository();