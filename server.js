import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan';
import cors from 'cors';
import programme from './routes/programme.js';
import commentairesProgramme from "./routes/commentairesProgramme.js";
import favorie from './routes/favorie.js';
import coursProgramme from './routes/coursProgramme.js';
import quiz from './routes/quiz.js';
import questions from './routes/questions.js';
import choix from './routes/choix.js';

import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import trajetSecuriseRoutes from './routes/tarjetSecuriseRoute.js'
const app = express() 
const hostname = '127.0.0.1'; 
const port=process.env.PORT || 9090
const databaseName = 'safeguardDB';
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
//Education
app.use("/programme", programme);
app.use("/commentairesProgramme", commentairesProgramme);
app.use("/favorie", favorie);
app.use("/quiz",quiz);
app.use("/questions",questions);
app.use("/choix",choix);
app.use("/cours",coursProgramme);

app.use(notFoundError);
app.use (errorHandler);
app.listen(port,()=>{
    console.log(`Server running ${hostname}:${port}`)
})