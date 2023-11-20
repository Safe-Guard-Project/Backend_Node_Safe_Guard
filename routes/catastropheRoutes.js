
import express from 'express';
import {
    addCatastrophe,
    getAllCatastrophes,
    getCatastropheById,
    updateCatastropheById,
    deleteCatastropheById,
    deleteAllCatastrophes
} from '../controllers/catastropheController.js';
import { body } from 'express-validator';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Catastrophe:
 *       type: object
 *       required:
 *         - titre
 *         - type
 *         - description
 *         - date
 *         - radius
 *         - magnitude
 *         - latitudeDeCatastrophe
 *         - longitudeDeCatastrophe
 *       properties:
 *         titre:
 *           type: string
 *           description: The title of the catastrophe.
 *         type:
 *           type: string
 *           enum:
 *             - Earthquake
 *             - Tsunami
 *           description: The type of the catastrophe (Earthquake or Tsunami).
 *         description:
 *           type: string
 *           description: A description of the catastrophe.
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the catastrophe.
 *         radius:
 *           type: number
 *           description: The radius of the catastrophe.
 *         magnitude:
 *           type: number
 *           description: The magnitude of the catastrophe.
 *         latitudeDeCatastrophe:
 *           type: number
 *           description: The latitude of the catastrophe.
 *         longitudeDeCatastrophe:
 *           type: number
 *           description: The longitude of the catastrophe.
 *       example:
 *         titre: Earthquake in City X
 *         type: Earthquake
 *         description: A powerful earthquake that hit City X.
 *         date: '2023-01-01'
 *         radius: 50
 *         magnitude: 7.5
 *         latitudeDeCatastrophe: 34.0522
 *         longitudeDeCatastrophe: -118.2437
 */

/**
 * @swagger
 * /catastrophe:
 *   get:
 *     summary: Get all catastrophes.
 *     responses:
 *       '200':
 *         description: Successful retrieval of all catastrophes.
 *         content:
 *           application/json:
 *             example:
 *               - titre: Earthquake in City X
 *                 type: Earthquake
 *                 description: A powerful earthquake that hit City X.
 *                 date: '2023-01-01'
 *                 radius: 50
 *                 magnitude: 7.5
 *                 latitudeDeCatastrophe: 34.0522
 *                 longitudeDeCatastrophe: -118.2437
 *               - titre: Tsunami in City Y
 *                 type: Tsunami
 *                 description: A devastating tsunami in City Y.
 *                 date: '2023-02-15'
 *                 radius: 80
 *                 magnitude: 9.0
 *                 latitudeDeCatastrophe: 40.7128
 *                 longitudeDeCatastrophe: -74.0060
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /catastrophe:
 *   post:
 *     summary: Create a new catastrophe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catastrophe'
 *     responses:
 *       '200':
 *         description: Successful creation of a new catastrophe.
 *         content:
 *           application/json:
 *             example:
 *               titre: Earthquake in City X
 *               type: Earthquake
 *               description: A powerful earthquake that hit City X.
 *               date: '2023-01-01'
 *               radius: 50
 *               magnitude: 7.5
 *               latitudeDeCatastrophe: 34.0522
 *               longitudeDeCatastrophe: -118.2437
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /catastrophe:
 *   delete:
 *     summary: Delete all catastrophes.
 *     responses:
 *       '200':
 *         description: Successful deletion of all catastrophes.
 *       '500':
 *         description: Internal server error.
 */



router
    .route('/')
    .get(getAllCatastrophes)
    .delete(deleteAllCatastrophes)
    .post(
        body('titre').isLength({ min: 5 }),
        body('description').isLength({ min: 5 }),
        body('date').isISO8601().toDate(),
        body('radius').isNumeric(),
        body('magnitude').isNumeric(),
        body('latitudeDeCatastrophe').isNumeric(),
        body('longitudeDeCatastrophe').isNumeric(),
        addCatastrophe
    );

/**
 * @swagger
 * /catastrophe/{id}:
 *   get:
 *     summary: Get a catastrophe by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of the catastrophe by ID.
 *         content:
 *           application/json:
 *             example:
 *               titre: Earthquake in City X
 *               type: Earthquake
 *               description: A powerful earthquake that hit City X.
 *               date: '2023-01-01'
 *               radius: 50
 *               magnitude: 7.5
 *               latitudeDeCatastrophe: 34.0522
 *               longitudeDeCatastrophe: -118.2437
 *       '404':
 *         description: Catastrophe not found.
 *       '500':
 *         description: Internal server error.
 */
/**
 * @swagger
 * /catastrophe/{id}:
 *   put:
 *     summary: Update a catastrophe by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catastrophe'
 *     responses:
 *       '200':
 *         description: Successful update of the catastrophe by ID.
 *         content:
 *           application/json:
 *             example:
 *               titre: Updated Earthquake in City X
 *               type: Earthquake
 *               description: An updated earthquake in City X.
 *               date: '2023-01-01'
 *               radius: 50
 *               magnitude: 8.0
 *               latitudeDeCatastrophe: 34.0522
 *               longitudeDeCatastrophe: -118.2437
 *       '404':
 *         description: Catastrophe not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /catastrophe/{id}:
 *   delete:
 *     summary: Delete a catastrophe by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Successful deletion of the catastrophe by ID.
 *       '404':
 *         description: Catastrophe not found.
 *       '500':
 *         description: Internal server error.
 */


router
    .route('/:id')
    .get(getCatastropheById)
    .put(updateCatastropheById)
    .delete(deleteCatastropheById);

export default router;
