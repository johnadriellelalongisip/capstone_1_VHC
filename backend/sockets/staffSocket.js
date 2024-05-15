const dbModel = require('../models/database_model');

module.exports = function(io) {
  io.on('connection', (socket) => {

    socket.on('updateStaff', async () => {
      console.log('EMAIL_USER:', process.env.EMAIL_USER);
      console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
      try {
        const connection = await dbModel.getConnection();
        const query = "SELECT `staff_id`, `staff_username`, `staff_email`, `isVerified`, `staff_role`, `account_created_at`, `account_last_updated_at`, `staff_last_activity` FROM `medicalstaff`";
        const response = await dbModel.query(query);
        dbModel.releaseConnection(connection);
        const convertDateTime = (Ddate) => {
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
              isVerified: res.isVerified ? 'Verified' : 'Unverified',
              account_created_at: convertDateTime(res.account_created_at),
              account_last_updated_at: convertDateTime(res.account_last_updated_at),
              staff_last_activity: convertDateTime(res.staff_last_activity),
          };
        });
        socket.emit('newStaff', newResponse);
        socket.broadcast.emit('newStaff', newResponse);
      } catch (error) {
        socket.emit('newStaffError', error.message);
        socket.broadcast.emit('newStaffError', error.message);
      }
    });

  });
};