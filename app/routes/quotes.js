const express = require('express');
const controller = require('../controllers/quotes');
const router = express.Router();

router.route('/random').get(controller.getRandom);
router.route('/').post(controller.post);

module.exports = router;