const dbModel = require('../models/database_model');

module.exports = function(io) {
  io.on('connection', (socket) => {

    socket.on('updateStaff', async () => {
      let connection;
      try {
        connection = await dbModel.getConnection();
        const query = "SELECT `staff_id`, `username`, `email`, `isVerified`, `role` FROM `medicalstaff`";
        const response = await dbModel.query(query);
        const newResponse = response.map((res) => {
          return {
              ...res,
              isVerified: res.isVerified ? 'Verified' : 'Unverified'
          };
        });
        socket.emit('newStaff', newResponse);
        socket.broadcast.emit('newStaff', newResponse);
      } catch (error) {
        socket.emit('newStaffError', error.message);
        socket.broadcast.emit('newStaffError', error.message);
      } finally {
        dbModel.releaseConnection(connection);
      }
    });

  });
};