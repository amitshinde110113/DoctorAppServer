const express = require('express');
const router= express.Router();
const hospitalController=require('../controllers/hospitalCntroller');

router.post('/create',hospitalController.create);
router.get('/get/:Id',hospitalController.get);
router.get('/getAll/:id',hospitalController.getAll);
router.patch('/update/:id',hospitalController.update);
router.patch('/remove',hospitalController.remove);
module.exports = router;