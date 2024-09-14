const dbModel = require('../models/database_model');

module.exports = function(io) {
  io.on('connection', (socket) => {

    socket.on('updateAppointment', async () => {
      let connection;
      try {
        connection = await dbModel.getConnection();
        const response = await dbModel.query("SELECT a.appointment_id, CASE WHEN a.citizen_id IS NULL OR a.fullname IS NOT NULL THEN a.fullname ELSE CONCAT(mc.citizen_firstname, ' ', mc.citizen_lastname) END AS citizen_fullname, CASE WHEN a.citizen_id IS NULL THEN a.phone_number ELSE mc.citizen_number END AS phone_number, a.appointed_datetime AS appointed_datetime,a.description AS description, a.status AS status, a.created_at AS created_at FROM appointments a LEFT JOIN citizen mc ON a.citizen_id = mc.citizen_family_id");
        const convertDate = (Ddate) => {
          const date = new Date(Ddate);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = date.getHours() % 12 || 12;
          const meridian = date.getHours() >= 12 ? 'PM' : 'AM';
          const minutes = String(date.getMinutes()).padStart(2, '0');
          const formattedDateString = `${month}-${day}-${year} ${hours}:${minutes} ${meridian}`;
          return formattedDateString;
        };
        const newResponse = response.map((res) => {
          return {
              ...res,
              appointed_datetime: convertDate(res.appointed_datetime),
              created_at: convertDate(res.created_at),
          };
        });
        socket.emit('newAppointments', newResponse);
        socket.broadcast.emit('newAppointments', newResponse);
      } catch (error) {
        socket.emit('newAppointmentsError', error.message);
        socket.broadcast.emit('newAppointmentsError', error.message);
      } finally {
        dbModel.releaseConnection(connection);
      }
    });

  });
};