const express = require('express');
const router= express.Router();
const doctorController=require('../controllers/doctorController');

router.post('/create',doctorController.signUp);
router.get('/get',doctorController.getDoctors);
router.get('/getDoctorById/:id',doctorController.getDoctorById);

router.post('/login',doctorController.login);

// router.get('/getAll',doctorController.getAll);
router.patch('/update/:id',doctorController.update);
router.patch('/remove/:id',doctorController.remove);
module.exports = router;