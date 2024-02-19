// routes/routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const staffController = require('../controllers/staffController');
const recordController = require('../controllers/recordController');

router.post('/addUsers', userController.addUser);
router.get('/getUsers', userController.getUsers);
router.get('/searchUser/:id', userController.searchUser);
router.post('/deleteUser', userController.deleteUser);
router.post('/editUser', userController.editUser);

// USER AUTHENTICATION/REGISTRATION
router.post('/addStaff', staffController.addStaff);
router.post('/authStaff', staffController.authStaff);

// RECORDS
router.post('/addRecord', recordController.addRecord);
router.get('/getRecords', recordController.getRecords);
router.get('/findRecord/:id', recordController.findRecord);
router.post('/addRecordHistory/:id', recordController.addRecordHistory);

module.exports = router;