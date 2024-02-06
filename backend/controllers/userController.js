const dbModel = require('../models/database_model');

class UserController {
  async addUser(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const query = 'INSERT INTO users (first_name, last_name) VALUES (?, ?)';
      const user = req.body;
      const response = await dbModel.query(query, [user.firstname, user.lastname]);
      const data = await dbModel.query('SELECT * FROM ??', 'users');
      dbModel.releaseConnection(connection);
      res.status(200).json({ response, data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUsers(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const data = await dbModel.query('SELECT * FROM users');
      dbModel.releaseConnection(connection);
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async searchUser(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const userId = req.params.id;
      const data = await dbModel.query('SELECT * FROM users WHERE id = ?', userId);
      dbModel.releaseConnection(connection);
      res.status(202).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const con = await dbModel.getConnection();
      const userId = req.body.id;
      const response = await dbModel.query('DELETE FROM users WHERE id = ?', userId);
      const data = await dbModel.query('SELECT * FROM users');
      dbModel.releaseConnection(con);
      res.status(202).json({ response,data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async editUser(req, res) {
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
      dbModel.releaseConnection(con);
      res.status(202).json({ response, data });
    } catch (error) {
      
    }
  }
}

module.exports = new UserController();
