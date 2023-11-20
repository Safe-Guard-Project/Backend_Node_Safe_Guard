import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import trajetSecuriseRoutes from './routes/tarjetSecuriseRoute.js';
import commentairesInformationRoute from './routes/commentairesInformationRoute.js';
import notificationRoute from './routes/notificationRoute.js';
import informationRoute from './routes/informationRoute.js';
const app = express() 
const hostname = '127.0.0.1'; 
const port=process.env.PORT || 9090 
const databaseName = 'safeguardDB';
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
    },
  },
  // Path to the API docs
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
mongoose.set('debug',true);
mongoose.Promise = global.Promise;
mongoose
mongoose
  .connect(`mongodb://${hostname}:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/trajetSecurise', trajetSecuriseRoutes);
app.use('/information',informationRoute);
app.use('/commentairesinformation', commentairesInformationRoute);
app.use('/notification', notificationRoute);

// Serve Swagger UI at /api-docs
app.use('/safeG', swaggerUi.serve, swaggerUi.setup(specs));

app.use(notFoundError);
app.use (errorHandler);
app.listen(port,()=>{
    console.log(`Server running ${hostname}:${port}`)
})