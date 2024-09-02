const dbModel = require('../models/database_model');

class QueueController {
  async addToQueue(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const payload = req.body;744444444444444
          const query = 'INSERT INTO `patient_queue`(`patient_name`,`patient_gender`,`barangay_from`,`time_arrived`,`current_status`,`patient_status_history`) VALUES (?, ?, ?, ?, ?, ?)';
      const status = {}
      const SKey = String(payload.time_added);
      status[SKey] = payload.status;
      const data = [
        payload.name,
        payload.gender,
        payload.barangay,
        payload.time_added,
        payload.status,
        JSON.stringify(status), 
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
      const date = new Date(req.body.dateTime);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      const startDate = `${year}-${month}-${day} 00:00:00`;
      const endDate = `${year}-${month}-${day} 23:59:59`;
      const query = 'SELECT * FROM `patient_queue` WHERE `time_arrived` BETWEEN ? AND ?';
      const response = await dbModel.query(query, [startDate, endDate]);
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
  };

  async getAttended(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const query = 'SELECT * FROM `patient_queue`';
      const response = await dbModel.query(query);
      return res.status(200).json({
        status: 200,
        message: "Attended Patients Retreived Successfully!",
        data: response
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
      const date = new Date(req.body.dateTime);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      const startDate = `${year}-${month}-${day} 00:00:00`;
      const endDate = `${year}-${month}-${day} 23:59:59`;
      const getFIFO = await dbModel.query('SELECT `queue_number`, `patient_status_history`, `time_arrived` FROM `patient_queue` WHERE `time_arrived` BETWEEN ? AND ? AND `current_status` = "waiting" ORDER BY `queue_number` ASC LIMIT 1', [startDate, endDate]);
      const status = getFIFO.map(row => ({
        queue_number: row.queue_number,
        patient_status_history: row.patient_status_history,
        time_arrived: row.time_arrived
      }));
      const nextOnQueue = status.filter(item => {
        const patientStatus = JSON.parse(item.patient_status_history);
        const patientStatusValues = Object.values(patientStatus);
        return patientStatusValues[patientStatusValues.length - 1] === "waiting";
      });
      nextOnQueue.sort((a, b) => a.queue_number - b.queue_number)
      const nextPatientStatus = JSON.parse(nextOnQueue[0].patient_status_history);
      const newStatus = {
        ...nextPatientStatus,
        [req.body.dateTime]: 'serving'
      };
      const query = 'UPDATE `patient_queue` SET `patient_status_history` = ?, `current_status` = "serving" WHERE `queue_number` = ?';
      await dbModel.query(query, [JSON.stringify(newStatus), nextOnQueue[0].queue_number]);
      res.status(200).json({ 
        status: 200, 
        message: `Now Serving: ${nextOnQueue[0].queue_number}` 
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

  async dismissQueue(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const selectQuery = 'SELECT `patient_status_history` FROM `patient_queue` WHERE `queue_number` = ?';
      const [currentStatus] = await dbModel.query(selectQuery, [req.params.id]);
      const oldStatus = JSON.parse(currentStatus.patient_status_history);
      const statusValues = Object.values(oldStatus);
      const status = statusValues[statusValues.length - 1]

      if (!currentStatus) {
        return res.status(404).json({
          status: 404,
          message: `Queue number ${req.params.id} not found`
        });
      }
      if (status === "served") {
        return res.status(200).json({
          status: 200,
          message: `Queue number ${req.params.id} is already served`
        });
      }
      const updateQuery = 'UPDATE `patient_queue` SET `patient_status_history` = ?, `current_status` = "served" WHERE `queue_number` = ?';
      const newStatus = {
        ...oldStatus,
        [req.body.dateTime]: "served"
      };
      const response = await dbModel.query(updateQuery, [JSON.stringify(newStatus), req.params.id]);
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