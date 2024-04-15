// routes/routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const staffController = require('../controllers/staffController');
const recordController = require('../controllers/recordController');
const pharmacyController = require('../controllers/pharmacyController');
const queueController = require('../controllers/queueController');
const appointmentController = require('../controllers/appointmentController');

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
router.get('/findFirstName/:id', recordController.findFirstName);

// PHARMACY
router.post('/submitCSVMedicinesRecord', pharmacyController.handleFile);
router.get('/getPharmacyInventory', pharmacyController.getPharmacyInventory);
router.get('/searchPharmacyInventory/:id', pharmacyController.searchPharmacyInventory);

// QUEUE
router.post('/addToQueue', queueController.addToQueue);
router.get('/getQueue', queueController.getQueue);

// APPOINTMENTS
router.post('/newAppointment', appointmentController.newAppointment);
router.get('/getAppointments', appointmentController.getAppointments);
router.get('/findAppointmentByNumber/:id', appointmentController.findAppointmentByNumber);
router.get('/findAppointmentByName/:id', appointmentController.findAppointmentByName);
router.post('/editAppointment', appointmentController.editAppointment);


module.exports = router;