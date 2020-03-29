const express = require('express');
const router= express.Router();
const appointmentController=require('../controllers/apointmentController');

router.get('/',appointmentController.get)

module.exports = router;