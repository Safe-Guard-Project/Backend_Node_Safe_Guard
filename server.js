import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan';
import cors from 'cors';
import programme from './routes/programme.js';
import commentairesProgramme from "./routes/commentairesProgramme.js";
import favorie from './routes/favorie.js';
import coursProgramme from './routes/coursProgramme.js';
import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import trajetSecuriseRoutes from './routes/tarjetSecuriseRoute.js';
import zoneDeDangerRoutes from './routes/zoneDeDangerRoute.js';
import commentairesInformationRoute from './routes/commentairesInformationRoute.js';
import notificationRoute from './routes/notificationRoute.js';
import informationRoute from './routes/informationRoute.js';
import alertRoutes from './routes/alertRoutes.js';
import catastropheRoutes from './routes/catastropheRoutes.js';
import usgsRoutes from './routes/usgs_api.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import quiz from './routes/quiz.js';
import questions from './routes/questions.js';
import choix from './routes/choix.js';

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
app.use('/zoneDeDanger', zoneDeDangerRoutes);
//Education
app.use("/programme", programme);
app.use("/commentairesProgramme", commentairesProgramme);
app.use("/favorie", favorie);
app.use("/quiz",quiz);
app.use("/questions",questions);
app.use("/choix",choix);
app.use("/cours",coursProgramme);

app.use('/information',informationRoute);
app.use('/commentairesinformation', commentairesInformationRoute);
app.use('/notification', notificationRoute);

app.use('/alert', alertRoutes);
app.use('/catastrophe', catastropheRoutes);
app.use('/api', usgsRoutes);

app.use('/safeG', swaggerUi.serve, swaggerUi.setup(specs));

app.use(notFoundError);
app.use (errorHandler);
app.listen(port,()=>{
    console.log(`Server running ${hostname}:${port}`)
})
