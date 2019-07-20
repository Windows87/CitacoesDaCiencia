const express = require('express');
const controller = require('../controllers/quotes');
const router = express.Router();

router.route('/').get(controller.get);
router.route('/random').get(controller.getRandom);
router.route('/:_id').get(controller.getOne);
router.route('/').post(controller.post);

module.exports = router;