const express = require('express');
const controller = require('../controllers/quotes');
const router = express.Router();

router.route('/').get(controller.get);
router.route('/random').get(controller.getRandom);
router.route('/:_id').get(controller.getOne);
router.route('/').post(controller.post);
router.route('/:_id').put(controller.put);
router.route('/:_id').delete(controller.delete);

module.exports = router;