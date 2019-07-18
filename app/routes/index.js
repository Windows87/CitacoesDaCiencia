const express = require('express');
const router = express.Router();

const quotesRouter = require('./quotes');

router.get('/', (req, res) => {
  res.json({ name: 'Science Quotes', version: '1.0.0' });	
});

router.use('/quotes', quotesRouter);

module.exports = router;