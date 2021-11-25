console.clear()

require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(morgan('dev'));
app.use('/api/v1', require('./routes'))

app.listen(PORT, () => {
  console.log('Escuchando en el puerto', PORT);
});