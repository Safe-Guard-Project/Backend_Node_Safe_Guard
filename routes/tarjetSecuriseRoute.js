import express from 'express';
import { body } from 'express-validator';
import { getUserPositionIndangerEtatFalse , getUserPositionIndangerEtatTrue,getusersByTrajet, getTarjetSecurises,
     createTarjetSecurise, updateTrajetSecurise, deleteTrajetSecurise, getCatastropheRadius,getUserPosition,chnageEtatTofalse,
     chnageEtatTotrue,getTrajetSecuriseById ,getCatastropheRadiusLatidtudeAndlongitude,getUserPositionIndanger} from '../controllers/tarjetSecuriseControllers.js';

const router = express.Router();

router.route('/getusersByTrajetSecurise')
    .get(getusersByTrajet);
router
    .route('/')
    .get(getTarjetSecurises)
    .post(
        body('iduser').isMongoId(),
        body('idCatastrophe').isMongoId(),
        body('etat').isBoolean(),
        createTarjetSecurise);

router.route('/:id')
    .get(getTrajetSecuriseById)
    .put(updateTrajetSecurise)
    .delete(deleteTrajetSecurise);
router.route('/userPosition/:id')
        .get(getUserPosition);
router.route('changeEtatToFalse/:id')
        .put(chnageEtatTofalse);
router.route('changeEtatToTrue/:id')
        .put(chnageEtatTotrue);
router.route('/catastropheInfo/:id')
        .get(getCatastropheRadiusLatidtudeAndlongitude);
router.route('/radius/:id')
    .get(getCatastropheRadius);


router.route('/getUserPositionIndangerEtatTrue/:latitudeDeCatastrophe/:longitudeDeCatastrophe/:radius')
    .get(getUserPositionIndangerEtatTrue);

router.route('/getUserPositionIndangerEtatFalse/:latitudeDeCatastrophe/:longitudeDeCatastrophe/:radius') 
        .get(getUserPositionIndangerEtatFalse); 

router.route('/getUserPositionIndanger') 
        .get(getUserPositionIndanger);
export default router;