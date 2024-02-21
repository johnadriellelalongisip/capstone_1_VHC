const dbModel = require('../models/database_model');

class PharmacyController {
  
  async handleFile(req, res) {
    try {
      // const connection = await dbModel.getConnection();
      // const payload = req.body.data;
      // const log = req.body.log;
      // const data = {
      //   item_name: payload.item_name,
      //   unit_size: payload.unit_size,
      //   exp_date: payload.exp_date,
      //   quantity_stockroom: quantity_stockroom,
      //   item_logs: log,
      // };
      // const response = await dbModel.query('INSERT INTO `pharmacy_inventory` (`item_name`, `unit_size`, `lot_no`, `exp_date`, `quantity_stockroom`, `item_logs`) VALUES (?, ?, ?, ?, ?, ?)', req.body.data);
      // dbModel.releaseConnection(connection);
      res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: req.body
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Something have gone wrong',
        error: error,
      })
    }
  }

}
module.exports = new PharmacyController();