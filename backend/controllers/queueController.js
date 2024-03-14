const dbModel = require('../models/database_model');

class QueueController {
  async addToQueue(req, res) {
    try {
      const connection = await dbModel.getConnection();
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
      dbModel.releaseConnection(connection);
      res.status(200).json({
        status: 200,
        message: 'Record added successfully',
        response: response,
        type: 'add'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    }
  }

  async getQueue(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const query = 'SELECT `queue_number`,`queue_number`, `patient_name`,`patient_gender`, `barangay_from`, `time_arrived`, `patient_status` FROM `patient_queue`';
      const response = await dbModel.query(query)
      dbModel.releaseConnection(connection);
      res.status(200).json({
        status: 200,
        message: 'Record Retrieved Successfully',
        data: response,
        type: 'get'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    }
  }
}

module.exports = new QueueController();