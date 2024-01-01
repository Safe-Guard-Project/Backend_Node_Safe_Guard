import express from 'express';
import { body } from 'express-validator';
import {  deleteZoneDeDangerswithlatitudeAndlongitude,getZoneDeDangersByCatastropheRadius,createZoneDeDanger, getZoneDeDangers, updateZoneDeDanger, deleteZoneDeDanger ,getZoneDeDangerById } from '../controllers/zoneDeDangerController.js';

const router = express.Router();

router
    .route('/')
    .get(getZoneDeDangers)
    .post(
        body('idUser').isMongoId(),
        body('latitudeDeZoneDanger').isNumeric(),
        body('longitudeDeZoneDanger').isNumeric(),
        createZoneDeDanger);

router.route('/:id')
    .put(updateZoneDeDanger)
    .delete(deleteZoneDeDanger);
   
router.route('/getZoneDeDangersByCatastropheRadius')
    .get(getZoneDeDangersByCatastropheRadius);
    
router.route('/deleteZoneDeDangerswithlatitudeAndlongitude/:latitudeDeZoneDanger/:longitudeDeZoneDanger')
    .delete(deleteZoneDeDangerswithlatitudeAndlongitude);

export default router;

