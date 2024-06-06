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
      const getEmergency = await dbModel.query('SELECT `queue_number` FROM `patient_queue` WHERE `patient_status` = "emergency" ORDER BY `queue_number` ASC LIMIT 1');
      console.log(getEmergency);
      const getFIFO = await dbModel.query('SELECT `queue_number` FROM `patient_queue` WHERE `patient_status` = "waiting" ORDER BY `queue_number` ASC LIMIT 1');
      const query = 'UPDATE `patient_queue` SET `patient_status` = "serving", `time_attended` = ? WHERE `queue_number` = ?';
      const response = await dbModel.query(query, [req.body.dateTime, getFIFO[0].queue_number]);
      console.log(response);
      res.status(200).json({ status: 200, message: `Now Serving: ${getFIFO[0].queue_number}` });
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

  async dismissQueue(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const selectQuery = 'SELECT `patient_status` FROM `patient_queue` WHERE `queue_number` = ?';
      const [currentStatus] = await dbModel.query(selectQuery, [req.params.id]);
      if (!currentStatus) {
        return res.status(404).json({
          status: 404,
          message: `Queue number ${req.params.id} not found`
        });
      }
      console.log(`Current status of queue number ${req.params.id}:`, currentStatus.patient_status);
      if (currentStatus.patient_status === "served") {
        return res.status(200).json({
          status: 200,
          message: `Queue number ${req.params.id} is already served`
        });
      }
      const updateQuery = 'UPDATE `patient_queue` SET `patient_status` = "served" WHERE `queue_number` = ?';
      const response = await dbModel.query(updateQuery, [req.params.id]);
      console.log(response, req.params.id);
      if (response.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          message: `Queue number ${req.params.id} not found`
        });
      }
      res.status(200).json({ status: 200, message: `Successfully Dismissed Number: ${req.params.id}` });
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