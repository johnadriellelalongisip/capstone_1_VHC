const dbModel = require('../models/database_model');

class UserController {
  async addUser(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const query = 'INSERT INTO users (first_name, last_name) VALUES (?, ?)';
      const user = req.body;
      const response = await dbModel.query(query, [user.firstname, user.lastname]);
      const data = await dbModel.query('SELECT * FROM ??', 'users');
      return res.status(200).json({ response, data });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      })
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

  async getUsers(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const data = await dbModel.query('SELECT * FROM users');
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      })
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

  async searchUser(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const userId = req.params.id;
      const data = await dbModel.query('SELECT * FROM users WHERE id = ?', userId);
      return res.status(202).json({ data });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      })
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

  async deleteUser(req, res) {
    let connection;
    try {
      const con = await dbModel.getConnection();
      const userId = req.body.id;
      const response = await dbModel.query('DELETE FROM users WHERE id = ?', userId);
      const data = await dbModel.query('SELECT * FROM users');
      return res.status(202).json({ response,data });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      })
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

  async editUser(req, res) {
    let connection;
    try {
      const con = await dbModel.getConnection();
      const user = req.body;
      const values = [
        user.firstname,
        user.lastname,
        user.userId
      ];
      const response = await dbModel.query('UPDATE users SET first_name = ?, last_name = ? WHERE id = ?', values);
      const data = await dbModel.query('SELECT * FROM users');
      return res.status(202).json({ response, data });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      })
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }
}

module.exports = new UserController();
