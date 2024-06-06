const dbModel = require('../models/database_model');

class PharmacyController {
  
  async handleFile(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
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
      return res.status(200).json({
        status: 200,
        message: "Data inserted successfully",
      });
    } catch (error) {
      console.error("Error inserting data:", error);
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
  
  async getPharmacyInventory(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const query = 'SELECT `item_id`, `item_name`, `unit_size`, `lot_no`, `exp_date`, `quantity_stockroom` FROM `pharmacy_inventory`';
      const response = await dbModel.query(query);
      const formattedResponse = response.map((row) => {
        const expDate = row.exp_date ? new Date(row.exp_date) : null;
        const formattedExpDate = expDate ? expDate.toLocaleDateString() : null;
        return {
          ...row,
          exp_date: formattedExpDate,
        };
      });
      return res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: formattedResponse,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      })
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

  async searchPharmacyInventory(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const query = 'SELECT `item_name`, `unit_size`, `lot_no`, `exp_date`, `quantity_stockroom`, `item_logs` FROM `pharmacy_inventory` WHERE `item_id` = ?';
      const response = await dbModel.query(query, req.params.id);
      const formattedResponse = response.map((row) => {
        const expDate = row.exp_date ? new Date(row.exp_date) : null;
        const formattedExpDate = expDate ? 
            `${expDate.getFullYear()}-${(expDate.getMonth() + 1).toString().padStart(2, '0')}-${expDate.getDate().toString().padStart(2, '0')}`
            : null;
        return {
            ...row,
            exp_date: formattedExpDate,
        };
      });
      return res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: formattedResponse,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      })
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

}
module.exports = new PharmacyController();