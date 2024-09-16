// routes/routes.js
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const recordController = require('../controllers/recordController');
const pharmacyController = require('../controllers/pharmacyController');
const queueController = require('../controllers/queueController');
const appointmentController = require('../controllers/appointmentController');

// USER AUTHENTICATION/REGISTRATION
router.post('/verifyEmail', staffController.verifyEmail);
router.get('/getStaffId', staffController.getStaffId);
router.get('/getStaff', staffController.getStaff);
router.post('/addStaff', staffController.addStaff);
router.post('/logoutUser', staffController.logoutUser);
router.get('/verifyToken', staffController.verifyAccessToken);

// RECORDS
router.post('/addRecord', recordController.addRecord);
router.get('/getRecords', recordController.getRecords);
router.get('/findRecord/:id', recordController.findRecord);
router.post('/addRecordHistory/:id', recordController.addRecordHistory);
router.post('/findCitizen', recordController.findCitizen);

// PHARMACY
router.post('/submitCSVMedicinesRecord', pharmacyController.handleFile);
router.get('/getPharmacyInventory', pharmacyController.getPharmacyInventory);
router.get('/searchPharmacyInventory/:id', pharmacyController.searchPharmacyInventory);

// QUEUE
router.post('/addToQueue', queueController.addToQueue);
router.get('/getQueue', queueController.getQueue);
router.get('/getAttended', queueController.getAttended);
router.post('/nextQueue', queueController.nextQueue);
router.post('/dismissQueue/:id', queueController.dismissQueue);

// APPOINTMENTS
router.post('/newAppointment', appointmentController.newAppointment);
router.post('/newAppointmentByFamID', appointmentController.newAppointmentByFamID);
router.get('/getAppointments', appointmentController.getAppointments);
router.get('/findAppointmentByNumber/:id', appointmentController.findAppointmentByNumber);
router.post('/editAppointment', appointmentController.editAppointment);
router.post('/handleCancelAppointment/:id', appointmentController.handleCancelAppointment);
router.post('/handleApproveAppointment/:id', appointmentController.handleApproveAppointment);


module.exports = router;