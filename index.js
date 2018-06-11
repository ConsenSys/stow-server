require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.LINNIA_PORT;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', require('./routes/helloWorld'));
app.get('/records', require('./routes/records'));
app.get('/recordsByOwner', require('./routes/recordsByOwner'));
app.post('/records', require('./routes/createRecord'));

app.listen(port || 3000, () => {
  console.log('Linnia Server ready for action.');
});
