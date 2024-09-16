const dbModel = require('../models/database_model');

class QueueController {
  async addToQueue(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const { name, dateTime, status, staff_id } = req.body;
      const getFamilyIdQuery = 'SELECT `citizen_family_id` FROM `citizen` WHERE `citizen_firstname` LIKE ? OR `citizen_lastname` LIKE ?';
      const firstName = name.split(' ')[0];
      const lastName = name.split(' ')[1];
      const [citizen] = await dbModel.query(getFamilyIdQuery, [firstName, lastName]);
      if (!citizen) return res.status(404).json({ status: 404, message: 'Citizen not found!' });

      const insertQueueQuery = 'INSERT INTO `citizen_queue`(`citizen_family_id`,`time_arrived`,`current_status`) VALUES (?, ?, ?)';
      const data = [
        citizen.citizen_family_id,
        dateTime,
        status
      ];

      const insertHistoryQuery = 'INSERT INTO `citizen_history` (`family_id`, `action`, `action_details`, `staff_id`, `action_datetime`) VALUES (?, ?, ?, ?, ?)';
      const historyPayload = [
        citizen.citizen_family_id,
        'waiting',
        `added to queue as ${status}`,
        staff_id,
        dateTime
      ];
      await dbModel.query(insertHistoryQuery, historyPayload);
      const response = await dbModel.query(insertQueueQuery, data)
      if (response.affectedRows > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Queue added successfully',
        });
      } else {
        return res.status(404);
      }
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
      const query = `SELECT cq.queue_number, c.citizen_family_id AS family_id, CONCAT(c.citizen_firstname, ' ', c.citizen_middlename, ' ', c.citizen_lastname) AS citizen_fullname, c.citizen_barangay, c.citizen_number, c.citizen_gender, cq.time_arrived, cq.current_status FROM citizen c INNER JOIN  citizen_queue cq ON c.citizen_family_id = cq.citizen_family_id`;
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
      const query = `SELECT cq.queue_number, c.citizen_family_id AS family_id, CONCAT(c.citizen_firstname, ' ', c.citizen_middlename, ' ', c.citizen_lastname) AS citizen_fullname, c.citizen_barangay, c.citizen_number, c.citizen_gender, cq.time_arrived, cq.current_status FROM citizen c INNER JOIN  citizen_queue cq ON c.citizen_family_id = cq.citizen_family_id`;
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
      
      const getCitizenQueueQuery = `SELECT cq.queue_number, c.citizen_family_id, CONCAT(c.citizen_firstname, ' ', c.citizen_middlename, ' ', c.citizen_lastname) AS citizen_fullname, 
                c.citizen_barangay, c.citizen_number, c.citizen_gender, cq.time_arrived, cq.current_status 
         FROM citizen_queue cq
         INNER JOIN citizen c ON c.citizen_family_id = cq.citizen_family_id
         WHERE cq.time_arrived BETWEEN ? AND ? 
           AND cq.current_status = "waiting"
         ORDER BY cq.queue_number ASC
         LIMIT 1`
      const [getFIFO] = await dbModel.query(getCitizenQueueQuery, 
         [startDate, endDate]
      );
      
      const query = 'UPDATE citizen_queue SET current_status = "serving" WHERE queue_number = ?';
      const updateStatusResponse = await dbModel.query(query, [getFIFO.queue_number]);
      if (updateStatusResponse.affectedRows === 0) return res.status(404).json({ status: 404, message: "Something have gone wrong updating the status of the queue. "});
      const insertHistoryQuery = 'INSERT INTO `citizen_history` (`family_id`, `action`, `action_details`, `staff_id`, `action_datetime`) VALUES (?, ?, ?, ?, ?)';
      const historyPayload = [
        getFIFO.citizen_family_id,
        'serving',
        `citizen is being served`,
        req.body.staff_id,
        req.body.dateTime
      ];
      await dbModel.query(insertHistoryQuery, historyPayload);

      res.status(200).json({
        status: 200,
        message: `Now Serving: ${nextOnQueue.queue_number}`
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

      const selectQuery = 'SELECT `citizen_family_id`, `current_status` FROM `citizen_queue` WHERE `queue_number` = ?';
      const [currentStatus] = await dbModel.query(selectQuery, [req.params.id]);

      if (!currentStatus) {
        return res.status(404).json({
          status: 404,
          message: `Queue number ${req.params.id} not found`
        });
      }

      if (currentStatus.current_status === 'dismissed') {
        return res.status(200).json({
          status: 200,
          message: `Queue number ${req.params.id} is already dismissed`
        });
      }

      const insertCitizenHistoryQuery = 'INSERT INTO `citizen_history` (`family_id`, `action`, `action_details`, `staff_id`, `action_datetime`) VALUES (?, ?, ?, ?, ?)';
        
      const citizenHistoryPayload = [
        currentStatus.citizen_family_id,
        'dismissed',
        'dismissed from the queue',
        req.body.staff_id,
        req.body.dateTime
      ];
      
      const insertCitizenHistoryResponse = await dbModel.query(insertCitizenHistoryQuery, citizenHistoryPayload);
      
      if (insertCitizenHistoryResponse.affectedRows === 0) {
        return res.status(500).json({
          status: 500,
          message: `Failed to insert citizen history for queue number ${req.params.id}`
        });
      }

      const updateQueueStatusQuery = 'UPDATE `citizen_queue` SET `current_status` = ? WHERE `queue_number` = ?';

      const updateQueueStatusResponse = await dbModel.query(updateQueueStatusQuery, ['dismissed', req.params.id]);
      
      if (updateQueueStatusResponse.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          message: `Failed to update queue status for queue number ${req.params.id}`
        });
      }
      return res.status(200).json({
        status: 200,
        message: `Successfully dismissed queue number: ${req.params.id}`
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

  
}

module.exports = new QueueController();