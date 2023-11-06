import express from 'express';
import { body } from 'express-validator';
import {  getZoneDeDangersByCatastropheRadius,createZoneDeDanger, getZoneDeDangers, updateZoneDeDanger, deleteZoneDeDanger ,getZoneDeDangerById } from '../controllers/zoneDeDangerController.js';

const router = express.Router();

router
    .route('/')
    .get(getZoneDeDangers)
    .post(
        body('latitude').isNumeric(),
        body('longitude').isNumeric(),
        body('idUser').isNumeric(),
        createZoneDeDanger);

router.route('/:id')
    .put(updateZoneDeDanger)
    .delete(deleteZoneDeDanger);
   
router.route('/getZoneDeDangersByCatastropheRadius')
    .get(getZoneDeDangersByCatastropheRadius);
    


export default router;

