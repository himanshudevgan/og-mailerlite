const express = require('express');
const router = express.Router();
const mailerliteController = require('./../controllers/mailerlite');
router.get('/', mailerliteController.index);
router.post('/link', mailerliteController.link);
router.post('/changekey', mailerliteController.changekey);
router.post('/addsubscribertogroup',  mailerliteController.addsubscribertogroup);
module.exports = router;