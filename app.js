const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();
const swaggerJsDocs=  require('./swagger/swagger.json')
const app = express();
const {connections} = require('./db/conn')
const PORT = process.env.PORT || 3000;

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerJsDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use(require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});
const server = async()=>{
  try {
    connections
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
  
  } catch (error) {
    console.log(error,"error will be occured in the server");
  }
}

server()