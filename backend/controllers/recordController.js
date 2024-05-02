const dbModel = require('../models/database_model');

class RecordController {
  
  async addRecord(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const query = 'INSERT INTO `municipal_citizens`(`citizen_firstname`, `citizen_middlename`, `citizen_lastname`, `citizen_gender`, `citizen_birthdate`, `citizen_barangay`, `citizen_family_id`, `date_added`,  `citizen_number`, `citizen_history`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const payload = req.body;
      const data = [
        payload.firstName,
        payload.middleName,
        payload.lastName,
        payload.gender,
        payload.birthdate,
        payload.barangay,
        payload.family_id,
        payload.date_added,
        payload.phone_number,
        payload.history
      ];
      const response = await dbModel.query(query, data)
      dbModel.releaseConnection(connection);
      res.status(200).json({
        status: 200,
        message: 'Record added successfully',
        response: response,
        payload: data,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    }
  }

  async getRecords(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const response = await dbModel.query('SELECT `citizen_firstname`, `citizen_middlename`, `citizen_lastname`, `citizen_gender`, `citizen_birthdate`, `citizen_barangay`, `citizen_family_id`, `citizen_number` FROM `municipal_citizens`');
      dbModel.releaseConnection(connection);
      const newResponse = response.map((res) => {
        const date = new Date(res.citizen_birthdate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${month}-${day}-${year}`;
    
        return {
            citizen_family_id: res.citizen_family_id,
            ...res,
            citizen_birthdate: formattedDate
        };
      });
      res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: newResponse
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        error: error.message
      });
    }
  }

  async findRecord(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const query = "SELECT `citizen_history`, `citizen_firstname`,`citizen_middlename`, `citizen_lastname`, `citizen_gender`, `citizen_number`, `citizen_birthdate` FROM `municipal_citizens` WHERE `citizen_family_id` = ?";
      const family_id = req.params.id;
      const response = await dbModel.query(query, family_id);
      dbModel.releaseConnection(connection);
      res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        error: error.message
      });
    }
  }

  async addRecordHistory(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const payload = req.body;
      const family_id = req.params.id;
      const data = await dbModel.query('SELECT `citizen_history` FROM `municipal_citizens` WHERE `citizen_family_id` = ?', family_id);
      const oldHistory = JSON.parse(data[0].citizen_history);
      const newHistory = {...oldHistory, ...payload};
      const query = 'UPDATE `municipal_citizens` SET `citizen_history` = ? WHERE `citizen_family_id` = ?';
      const response = await dbModel.query(query, [JSON.stringify(newHistory), family_id]);
      dbModel.releaseConnection(connection);
      res.status(200).json({
        status: 200,
        message: "Data updated successfully",
        response: response
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        error: error.message
      });
    }
  }

  async findFirstName(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const query = "SELECT `citizen_family_id`, CONCAT(`citizen_firstname`, ' ', `citizen_lastname`) AS citizen_full_name, `citizen_gender`, `citizen_barangay`, `citizen_number` FROM `municipal_citizens` WHERE CONCAT(`citizen_firstname`, ' ', `citizen_lastname`) LIKE CONCAT('%', ?, '%')";
      const nameInput = req.params.id;
      const response = await dbModel.query(query, nameInput);
      dbModel.releaseConnection(connection);
      if (response.length !== 0) {
        res.status(200).json({
          status: 200,
          message: "Data retrieved successfully",
          data: response,
        });
      } else {
        res.status(204).json({
          status: 204,
          message: "Nothing data found",
          data: response,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        error: error.message
      });
    }
  }

}

module.exports = new RecordController();