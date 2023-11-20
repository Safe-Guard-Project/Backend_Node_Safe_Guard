import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { notFoundError, errorHandler } from './middlewares/error-handler.js';


const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 9090; // Port for the server
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
// Serve Swagger UI at /api-docs
app.use('/safeG', swaggerUi.serve, swaggerUi.setup(specs));

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/safeguardDB', {

})
  .then(async () => {
    console.log('Connected to safeguardDB');

  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/user', userRoutes);

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
