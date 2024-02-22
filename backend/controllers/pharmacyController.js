const dbModel = require('../models/database_model');

class PharmacyController {
  
  async handleFile(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const payload = req.body.data;
      const log = req.body.logs;
      for (const item of payload) {
        if (!item.item_name) {
          continue;
        }        
        const data = {
          item_name: item.item_name,
          unit_size: item.unit_size,
          lot_no: item.lot_no || null,
          exp_date: item.exp_date || null,
          quantity_stockroom: item.quantity_stockroom || null,
          item_logs: log,
        };
        await dbModel.query(
          'INSERT INTO `pharmacy_inventory` (`item_name`, `unit_size`, `lot_no`, `exp_date`, `quantity_stockroom`, `item_logs`) VALUES (?, ?, ?, ?, ?, ?)',
          [data.item_name, data.unit_size, data.lot_no, data.exp_date, data.quantity_stockroom, JSON.stringify(data.item_logs)]
        );
      }  
      dbModel.releaseConnection(connection);
      res.status(200).json({
        status: 200,
        message: "Data inserted successfully",
      });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        error: error,
      });
    }
  }
  
  async getPharmacyInventory(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const query = 'SELECT * FROM `pharmacy_inventory`';
      const response = await dbModel.query(query);
      dbModel.releaseConnection(connection);
      res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Something have gone wrong",
        error: error
      })
    }
  }

}
module.exports = new PharmacyController();