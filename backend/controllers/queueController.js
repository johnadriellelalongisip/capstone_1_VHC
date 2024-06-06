const dbModel = require('../models/database_model');

class QueueController {
  async addToQueue(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const query = 'INSERT INTO `patient_queue`(`patient_name`,`patient_gender`,`barangay_from`,`time_arrived`,`patient_status`) VALUES (?, ?, ?, ?, ?)';
      const payload = req.body;
      const data = [
        payload.name,
        payload.gender,
        payload.barangay,
        payload.time_added,
        payload.status, 
      ];
      const response = await dbModel.query(query, data)
      return res.status(200).json({
        status: 200,
        message: 'Queue added successfully',
        response: response,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

  async getQueue(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const query = 'SELECT * FROM `patient_queue`';
      const response = await dbModel.query(query)
      const newResponse = response.map((res) => {
        const date = new Date(res.time_arrived);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours() % 12 || 12);
        const minute = String(date.getMinutes());
        const meridian = date.getHours() >= 12 ? 'PM' : 'AM';
        const formattedDateTime = `${month}-${day}-${year} ${hour}:${minute} ${meridian}`;
        return {
          ...res,
          time_arrived: formattedDateTime,
        };
      });
      return res.status(200).json({
        status: 200,
        message: 'Queue Retrieved Successfully',
        data: newResponse,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

  async nextQueue(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      // const query = 'UPDATE `patient_queue` SET `patient_status` = "waiting", `time_attended` = ? WHERE `queue_number` = ?';
      // const response = await dbModel.query(query, [req.body.dateTime, id]);
      res.status(200).json({ status: 200, message: `Now Serving: ${id}` });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }
}

module.exports = new QueueController();