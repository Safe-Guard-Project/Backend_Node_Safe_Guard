import express from 'express';
import { body } from 'express-validator';
import { getUserPositionIndangerEtatFalse , getUserPositionIndangerEtatTrue,getusersByTrajet, getTrajetSecurises,
     createTarjetSecurise, updateTrajetSecurise, deleteTrajetSecurise, getCatastropheRadius,getUserPosition,chnageEtatTofalse,
     chnageEtatTotrue,getTrajetSecuriseById ,getCatastropheRadiusLatidtudeAndlongitude,getUserPositionIndanger} from '../controllers/tarjetSecuriseControllers.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     TrajetSecurise:
 *       type: object
 *       properties:
 *         etat:
 *           type: boolean
 *           description: The state of the tarjetSecurise.
 *         iduser:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the user associated with the tarjetSecurise.
 *         idCatastrophe:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the catastrophe associated with the tarjetSecurise.
 *       required:
 *         - etat
 *         - iduser
 *         - idCatastrophe
 */

/**
 * @swagger
 *  /trajetSecurise/getusersByTrajetSecurise/{latitudeDeCatastrophe}/{longitudeDeCatastrophe}/{radius}:
 *   get:
 *     summary: Get all users by trajetSecurise.
 *     parameters:
 *       - name: latitudeDeCatastrophe
 *         in: path
 *         required: true
 *         description: Latitude of the catastrophe.
 *         schema:
 *           type: number
 *       - name: longitudeDeCatastrophe
 *         in: path
 *         required: true
 *         description: Longitude of the catastrophe.
 *         schema:
 *           type: number
 *       - name: radius
 *         in: path
 *         required: true
 *         description: Radius of the catastrophe.
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Successful retrieval of all secured targets.
 *         content:
 *           application/json:
 *             example:
 *               - UserName: "user1"
 *               - email: "aaaaa@jcask.com"
 *               - password: "asxdzaaz"
 *               - Role: "client"
 *               - latitudeDeUser: 0
 *               - longitudeDeUser: 0
 *               - numeroTel: 0
 *       '500':
 *         description: Internal server error.
 */


router.route('/getusersByTrajetSecurise/:latitudeDeCatastrophe/:longitudeDeCatastrophe/:radius')
    .get(getusersByTrajet);


    
/**
 * @swagger
 * /trajetSecurise:
 *   get:
 *     summary: Get all secured targets.
 *     responses:
 *       '200':
 *         description: Successful retrieval of all secured targets.
 *         content:
 *           application/json:
 *             example:
 *               - iduser: "60c68a3fcd68e94b0c42289a"
 *                 idCatastrophe: "60c68a3fcd68e94b0c42289b"
 *                 etat: true
 *               - iduser: "60c68a3fcd68e94b0c42289c"
 *                 idCatastrophe: "60c68a3fcd68e94b0c42289d"
 *                 etat: false
 *       '500':
 *         description: Internal server error.
 *   post:
 *     summary: Create a new secured target.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             iduser: "60c68a3fcd68e94b0c42289a"
 *             idCatastrophe: "60c68a3fcd68e94b0c42289b"
 *             etat: true
 *     responses:
 *       '200':
 *         description: Successful creation of a secured target.
 *         content:
 *           application/json:
 *             example:
 *               iduser: "60c68a3fcd68e94b0c42289a"
 *               idCatastrophe: "60c68a3fcd68e94b0c42289b"
 *               etat: true
 *       '400':
 *         description: Bad request. Check the request body.
 *       '500':
 *         description: Internal server error.
 */


router
    .route('/')
    .get(getTrajetSecurises)
    .post(
        body('iduser').isMongoId(),
        body('idCatastrophe').isMongoId(),
        body('etat').isBoolean(),
        createTarjetSecurise);
/**
 * @swagger
 * /trajetSecurise/{id}:
 *   get:
 *     summary: Get a secured target by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the secured target.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of the secured target.
 *         content:
 *           application/json:
 *             example:
 *               etat: true
 *               iduser: "60c68a3fcd68e94b0c42289a"
 *               idCatastrophe: "60c68a3fcd68e94b0c42289b"
 *       '400':
 *         description: Bad request. Check the request parameters.
 *       '500':
 *         description: Internal server error.
 *   put:
 *     summary: Update a secured target by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the secured target.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             etat: false
 *             iduser: "60c68a3fcd68e94b0c42289a"
 *             idCatastrophe: "60c68a3fcd68e94b0c42289b"
 *     responses:
 *       '200':
 *         description: Successful update of the secured target.
 *         content:
 *           application/json:
 *             example:
 *               etat: false
 *               iduser: "60c68a3fcd68e94b0c42289a"
 *               idCatastrophe: "60c68a3fcd68e94b0c42289b"
 *       '400':
 *         description: Bad request. Check the request parameters.
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a secured target by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the secured target.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful deletion of the secured target.
 *       '400':
 *         description: Bad request. Check the request parameters.
 *       '500':
 *         description: Internal server error.
 */
router.route('/:id')
    .get(getTrajetSecuriseById)
    .put(updateTrajetSecurise)
    .delete(deleteTrajetSecurise);


/**
 * @swagger
 * /trajetSecurise/userPosition/{id}:
 *   get:
 *     summary: Get the position of a user associated with a secured target.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the secured target.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of the user's position.
 *         content:
 *           application/json:
 *             example:
 *               latitude: 0
 *               longitude: 0
 *       '400':
 *         description: Bad request. Check the request parameters.
 *       '500':
 *         description: Internal server error.
 */
router.route('/userPosition/:id')
        .get(getUserPosition);

/**
 * @swagger
 * /trajetSecurise/changeEtatToFalse/{id}:
 *   put:
 *     summary: Change the state of a secured target to false.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the secured target.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful state change of the secured target.
 *         content:
 *           application/json:
 *             example:
 *               etat: false
 *               iduser: "60c68a3fcd68e94b0c42289a"
 *               idCatastrophe: "60c68a3fcd68e94b0c42289b"
 *       '400':
 *         description: Bad request. Check the request parameters.
 *       '500':
 *         description: Internal server error.
 */
router.route('changeEtatToFalse/:id')
        .put(chnageEtatTofalse);

/**
 * @swagger
 * /trajetSecurise/changeEtatToTrue/{id}:
 *   put:
 *     summary: Change secured target state to true by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the secured target.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful change of the secured target state.
 *         content:
 *           application/json:
 *             example:
 *               etat: true
 *               iduser: "60c68a3fcd68e94b0c42289a"
 *               idCatastrophe: "60c68a3fcd68e94b0c42289b"
 *       '400':
 *         description: Bad request. Check the request parameters.
 *       '500':
 *         description: Internal server error.
 */


router.route('changeEtatToTrue/:id')
        .put(chnageEtatTotrue);
/**
 * @swagger
 * /trajetSecurise/catastropheInfo/{id}:
 *   get:
 *     summary: Get catastrophe information by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the catastrophe.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of catastrophe information.
 *         content:
 *           application/json:
 *             example:
 *               latitude: 0
 *               longitude: 0
 *               radius: 10
 *       '400':
 *         description: Bad request. Check the request parameters.
 *       '500':
 *         description: Internal server error.
 */


router.route('/catastropheInfo/:id')
        .get(getCatastropheRadiusLatidtudeAndlongitude);
/**
 * @swagger
 * /trajetSecurise/radius/{id}:
 *   get:
 *     summary: Get catastrophe radius by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the catastrophe.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of catastrophe radius.
 *         content:
 *           application/json:
 *             example:
 *               radius: 10
 *       '400':
 *         description: Bad request. Check the request parameters.
 *       '500':
 *         description: Internal server error.
 */

router.route('/radius/:id')
    .get(getCatastropheRadius);

/**
 * @swagger
 * /trajetSecurise/getUserPositionIndangerEtatTrue/{latitudeDeCatastrophe}/{longitudeDeCatastrophe}/{radius}:
 *   get:
 *     summary: Get users in danger with state true based on catastrophe location.
 *     parameters:
 *       - name: latitudeDeCatastrophe
 *         in: path
 *         required: true
 *         description: Latitude of the catastrophe.
 *         schema:
 *           type: number
 *       - name: longitudeDeCatastrophe
 *         in: path
 *         required: true
 *         description: Longitude of the catastrophe.
 *         schema:
 *           type: number
 *       - name: radius
 *         in: path
 *         required: true
 *         description: Radius of the catastrophe.
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Successful retrieval of users in danger with state true.
 *         content:
 *           application/json:
 *             example:
 *               - id: "60c68a3fcd68e94b0c42289a"
 *                 latitude: 0
 *                 longitude: 0
 *               - id: "60c68a3fcd68e94b0c42289b"
 *                 latitude: 1
 *                 longitude: 1
 *       '500':
 *         description: Internal server error.
 * 
 * /trajetSecurise/getUserPositionIndangerEtatFalse/{latitudeDeCatastrophe}/{longitudeDeCatastrophe}/{radius}:
 *   get:
 *     summary: Get users in danger with state false based on catastrophe location.
 *     parameters:
 *       - name: latitudeDeCatastrophe
 *         in: path
 *         required: true
 *         description: Latitude of the catastrophe.
 *         schema:
 *           type: number
 *       - name: longitudeDeCatastrophe
 *         in: path
 *         required: true
 *         description: Longitude of the catastrophe.
 *         schema:
 *           type: number
 *       - name: radius
 *         in: path
 *         required: true
 *         description: Radius of the catastrophe.
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Successful retrieval of users in danger with state false.
 *         content:
 *           application/json:
 *             example:
 *               - id: "60c68a3fcd68e94b0c42289a"
 *                 latitude: 0
 *                 longitude: 0
 *               - id: "60c68a3fcd68e94b0c42289b"
 *                 latitude: 1
 *                 longitude: 1
 *       '500':
 *         description: Internal server error.
 * 
 * /trajetSecurise/getUserPositionIndanger:
 *   get:
 *     summary: Get users in danger.
 *     responses:
 *       '200':
 *         description: Successful retrieval of users in danger.
 *         content:
 *           application/json:
 *             example:
 *               - id: "60c68a3fcd68e94b0c42289a"
 *                 latitude: 0
 *                 longitude: 0
 *               - id: "60c68a3fcd68e94b0c42289b"
 *                 latitude: 1
 *                 longitude: 1
 *       '500':
 *         description: Internal server error.
 */

router.route('/getUserPositionIndangerEtatTrue/:latitudeDeCatastrophe/:longitudeDeCatastrophe/:radius')
    .get(getUserPositionIndangerEtatTrue);

router.route('/getUserPositionIndangerEtatFalse/:latitudeDeCatastrophe/:longitudeDeCatastrophe/:radius') 
        .get(getUserPositionIndangerEtatFalse); 

router.route('/getUserPositionIndanger') 
        .get(getUserPositionIndanger);
export default router;