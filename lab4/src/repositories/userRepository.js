const pool = require('../config/db');

class UserRepository {
  async getById(id) {
    const query = 'SELECT id, name, role FROM users WHERE id = $1;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async create(data) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
        INSERT INTO users (name, email, role, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, role;
      `;
      const values = [data.name, data.email, data.role, data.password];
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
      const query = 'DELETE FROM users WHERE id = $1;';
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

module.exports = new UserRepository();