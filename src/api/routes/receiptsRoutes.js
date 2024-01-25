const express = require('express');
const router = express.Router();
const receiptsController = require('../controllers/receiptsController');



router.post('/process', receiptsController.processReceipt);
router.get('/:id/points', receiptsController.getPoints);

module.exports = router;
