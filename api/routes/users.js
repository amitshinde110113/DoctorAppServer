const express = require('express');
const router= express.Router();
const userController=require('../controllers/userController');

router.post('/signup',userController.signUp)
router.post('/login',userController.login)
router.patch('/update/:id',userController.update)
router.get('/getOTP/:email',userController.getOTP)
module.exports = router;