const dbModel = require('../models/database_model');

function convertDate(datebaseDate) {
  const date = new Date(datebaseDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = date.getHours() % 12 || 12;
  const meridian = date.getHours() >= 12 ? 'PM' : 'AM';
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const formattedDateString = `${month}-${day}-${year} @ ${hours}:${minutes} ${meridian}`;
  return formattedDateString;
}

function convertDate(datetime) {
  const appointedDateTime = new Date(datetime);
  const year = appointedDateTime.getFullYear();
  const month = (appointedDateTime.getMonth() + 1).toString().padStart(2, '0');
  const day = appointedDateTime.getDate().toString().padStart(2, '0');
  const hours = appointedDateTime.getHours().toString().padStart(2, '0');
  const minutes = appointedDateTime.getMinutes().toString().padStart(2, '0');
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDateTime;
}

class AppointmentController {

  async newAppointment(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const query = "INSERT INTO `appointments`(`citizen_id`, `fullname`, `phone_number`, `appointed_datetime`, `description`, `status`, `created_at`, `appointment_logs`) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ";
      const payload = req.body;
      const data = [
        null,
        payload.fullname,
        payload.phonenumber,
        payload.appointedTime,
        payload.description,
        payload.status,
        payload.createdAt,
        payload.logs,
      ];
      const response = await dbModel.query(query, data);
      return res.status(200).json({
        status: 200,
        message: "Data added successfully",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error,
      });
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

  async newAppointmentByFamID(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const findRecord = "SELECT `citizen_history`, `citizen_firstname`,`citizen_middlename`, `citizen_lastname`, `citizen_gender`, `citizen_number`, `citizen_birthdate` FROM `citizen` WHERE `citizen_family_id` = ?";
      if (!findRecord) return res.status(404).json({ status: 404, message: "User not found!"});
      const retrieveResponse = await dbModel.query(findRecord, req.body.appointmentID);
      const payload = req.body;
      const curRecord = retrieveResponse[0];
      const updateRecord = "UPDATE `citizen` SET `citizen_history` = ? WHERE `citizen_family_id` = ? ";
      const oldRecLogs = JSON.parse(curRecord.citizen_history);
      const newHistory = {};
      const Hkey = String(convertDate(new Date));
      newHistory[Hkey] = "Created an Appointment"
      const newRecLogs = {
        ...oldRecLogs,
        ...newHistory
      };
      const newRecord = [
        JSON.stringify(newRecLogs),
        payload.appointmentID
      ];
      const updateResponse = await dbModel.query(updateRecord, newRecord);
      const data = [
        payload.appointmentID,
        curRecord.citizen_firstname + ' ' + curRecord.citizen_middlename.substring(0,1) + '. ' + curRecord.citizen_lastname,
        payload.phonenumber ? payload.phonenumber : curRecord.citizen_number,
        payload.appointedTime,
        payload.description,
        payload.status,
        payload.createdAt,
        payload.logs
      ];
      const query = "INSERT INTO `appointments`(`citizen_id`, `fullname`, `phone_number`, `appointed_datetime`, `description`, `status`, `created_at`, `appointment_logs`) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ";
      const createResponse = await dbModel.query(query, data);
      return res.status(200).json({
        status: 200,
        message: "Appointment created successfully",
        createResponse: createResponse,
        retrieveResponse: retrieveResponse, 
        updateResponse: updateResponse
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Record not found!",
        error_message: error.message,
        error: error,
      });
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

  async getAppointments(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const response = await dbModel.query("SELECT a.appointment_id, CASE WHEN a.citizen_id IS NULL OR a.fullname IS NOT NULL THEN a.fullname ELSE CONCAT(mc.citizen_firstname, ' ', mc.citizen_lastname) END AS citizen_fullname, CASE WHEN a.citizen_id IS NULL THEN a.phone_number ELSE mc.citizen_number END AS phone_number, a.appointed_datetime AS appointed_datetime,a.description AS description, a.status AS status, a.created_at AS created_at FROM appointments a LEFT JOIN citizen mc ON a.citizen_id = mc.citizen_family_id");
      const newResponse = response.map((res) => {
        return {
          ...res,
          appointed_datetime: convertDate(res.appointed_datetime),
          created_at: convertDate(res.created_at)
        }
      });
      return res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: newResponse
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
  
  async editAppointment(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const query = "";
      const newResponse = response.map((res) => {
        return {
          ...res,
          appointed_datetime: convertDate(res.appointed_datetime),
          created_at: convertDate(res.created_at)
        }
      });
      return res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: newResponse
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

  async handleCancelAppointment(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const retrieveQuery = "SELECT `status`, `appointment_logs` FROM `appointments` WHERE `appointment_id` = ?";
      const retrieveResponse = await dbModel.query(retrieveQuery, req.params.id);
      const oldLogs = JSON.parse(retrieveResponse[0].appointment_logs);
      const newLogs = {};
      const LKey = String(convertDate(new Date));
      newLogs[LKey] = "Appointment Cancelled"
      const newAppointmentLog = {
        ...oldLogs,
        ...newLogs
      };
      const updatePayload = [
        "appointment cancelled",
        JSON.stringify(newAppointmentLog),
        req.params.id
      ];
      if (retrieveResponse[0].status === "appointment cancelled") {
        return res.status(200).json({
          status:200,
          message: "Appointment already cancelled!",
        })
      } else if (retrieveResponse[0].status === "scheduled") {
        return res.status(200).json({
          status:200,
          message: "Appointment already approved!",
        })
      } else {
        const updateQuery = "UPDATE `appointments` SET `status` = ?, `appointment_logs` = ? WHERE `appointment_id` = ?";
        const updateResponse = await dbModel.query(updateQuery, updatePayload);
        return res.status(200).json({
          status: 200,
          message: "Appointment successfully cancelled!",
          updateResponse: updateResponse
        });
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

  async handleApproveAppointment(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const retrieveQuery = "SELECT `status`, `appointment_logs` FROM `appointments` WHERE `appointment_id` = ?";
      const retrieveResponse = await dbModel.query(retrieveQuery, req.params.id);
      const oldLogs = JSON.parse(retrieveResponse[0].appointment_logs);
      const newLogs = {};
      const LKey = String(convertDate(new Date));
      newLogs[LKey] = "Appointment Approved"
      const newAppointmentLog = {
        ...oldLogs,
        ...newLogs
      };
      const updatePayload = [
        "scheduled",
        JSON.stringify(newAppointmentLog),
        req.params.id
      ];
      if (retrieveResponse[0].status === "scheduled") {
        return res.status(200).json({
          status:200,
          message: "Appointment already approved!",
        })
      } else if (retrieveResponse[0].status === "appointment cancelled") {
        return res.status(200).json({
          status:200,
          message: "Appointment already cancelled!",
        })
      } else {
        const updateQuery = "UPDATE `appointments` SET `status` = ?, `appointment_logs` = ? WHERE `appointment_id` = ?";
        const updateResponse = await dbModel.query(updateQuery, updatePayload);
        return res.status(200).json({
          status: 200,
          message: "Appointment successfully approved!",
          updateResponse: updateResponse
        });
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

  async findAppointmentByNumber(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const PK = req.params.id;
      const query = "SELECT `appointment_id`, `citizen_id`, `fullname`, `phone_number`, `appointed_datetime`, `description`, `status`, `created_at`, `appointment_logs` FROM `appointments` WHERE `appointment_id` = ?";
      const response = await dbModel.query(query, PK);
      const newResponse = response.map((res) => {
        return {
          ...res,
          appointed_datetime: convertDate(res.appointed_datetime),
        }
      });
      return res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: newResponse
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

module.exports = new AppointmentController();