const express = require('express');

const router = express.Router();
const purchaseController = require('../controllers/purchaseController.js');
const userAuthentecation = require('../middleware/authentication');

router.get('/premiumMembership',userAuthentecation.authenticate,purchaseController.purchasePremium);
router.post('/updateTransactionStatus',userAuthentecation.authenticate,purchaseController.updateTransStatus);

module.exports = router;
