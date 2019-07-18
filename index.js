const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./app/routes');

const app = express();
app.use(bodyParser.json());
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Running at port ${port}`));