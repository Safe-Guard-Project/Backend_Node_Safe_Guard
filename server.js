import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
<<<<<<< Updated upstream
=======
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import programme from './routes/programme.js';
import commentairesProgramme from "./routes/commentairesProgramme.js";
import favorie from './routes/favorie.js';
import quiz from './routes/quiz.js';
>>>>>>> Stashed changes
import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import trajetSecuriseRoutes from './routes/tarjetSecuriseRoute.js';
import zoneDeDangerRoutes from './routes/zoneDeDangerRoute.js';

<<<<<<< Updated upstream

const app = express() 
const hostname = '127.0.0.1'; 
const port=process.env.PORT || 9090 
=======
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 9090;
>>>>>>> Stashed changes
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

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${hostname}:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });
// Serve Swagger UI at /api-docs
app.use('/safeG', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/trajetSecurise', trajetSecuriseRoutes);
app.use('/zoneDeDanger', zoneDeDangerRoutes);
<<<<<<< Updated upstream
=======
// Education
app.use("/programme", programme);
app.use("/commentairesProgramme", commentairesProgramme);
app.use("/favorie", favorie);
app.use("/quiz", quiz);

app.use('/information', informationRoute);
app.use('/commentairesinformation', commentairesInformationRoute);
app.use('/notification', notificationRoute);

app.use('/alert', alertRoutes);
app.use('/catastrophe', catastropheRoutes);
app.use('/api', usgsRoutes);

app.use('/user', userRoutes);
>>>>>>> Stashed changes



app.use(notFoundError);
<<<<<<< Updated upstream
app.use (errorHandler);
app.listen(port,()=>{
    console.log(`Server running ${hostname}:${port}`)
})
=======
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running ${hostname}:${port}`);
});
>>>>>>> Stashed changes
