const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ScienceQuotes', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;