const express = require('express');
const router= express.Router();
const doctorController=require('../controllers/doctorController');

router.post('/create',doctorController.signUp);
router.post('/byCondition',doctorController.listByCondition);

router.get('/get',doctorController.getDoctors);
router.get('/getDoctorById/:id',doctorController.getDoctorById);

router.post('/login',doctorController.login);

// router.get('/getAll',doctorController.getAll);
router.patch('/update/:id',doctorController.update);
router.patch('/remove/:id',doctorController.remove);
router.get('/getOTP/:email',doctorController.getOTP)

module.exports = router;