const mysql = require('mysql');

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'capstone',
    });
  }

  getConnection() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      });
    });
  }

  releaseConnection(connection) {
    connection.release();
  }

  initializePool() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          console.log('Connected to the database pool!');
          resolve();
        }
      });
    });
  }  

  query(sql, values) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

}

const dbModel = new Database();

module.exports = dbModel;
