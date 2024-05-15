const dbModel = require('../models/database_model');

module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.on('updateRecords', async () => {
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
        socket.emit('newRecords', newResponse);
        socket.broadcast.emit('newRecords', newResponse);
      } catch (error) {
        socket.emit('newRecordsError', error.message);
        socket.broadcast.emit('newRecordsError', error.message);
      }
    });
  });
};