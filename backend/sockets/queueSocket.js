const dbModel = require('../models/database_model');

module.exports = function(io) {
  io.on('connection', (socket) => {

    socket.on('updateQueue', async (data) => {
      let connection;
      try {
        connection = await dbModel.getConnection();
        const date = new Date(data.dateTime);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const startDate = `${year}-${month}-${day} 00:00:00`;
        const endDate = `${year}-${month}-${day} 23:59:59`;
        const response = await dbModel.query('SELECT * FROM `patient_queue` WHERE `time_arrived` BETWEEN ? AND ?', [startDate, endDate]);
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
        socket.emit('newQueue', newResponse);
        socket.broadcast.emit('newQueue', newResponse);
      } catch (error) {
        socket.emit('newQueueError', error.message);
        socket.broadcast.emit('newQueueError', error.message);
      } finally {
        dbModel.releaseConnection(connection);
      }
    });

    socket.on('updateAttended', async (data) => {
      let connection;
      try {
        connection = await dbModel.getConnection();
        const query = 'SELECT * FROM `patient_queue` WHERE `time_arrived` BETWEEN ? AND ?';
        const response = await dbModel.query(query, [data.startDate, data.endDate]);
        socket.emit('newAttended', response);
        socket.broadcast.emit('newAttended', response);
      } catch (error) {
        socket.emit('newAttendedError', error.message);
        socket.broadcast.emit('newAttendedError', error.message);
      } finally {
        dbModel.releaseConnection(connection);
      }
    })
    
  });
};