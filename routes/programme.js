import express from "express";
import {
  AjouterProgramme,
  getAllProg,
  getOnceProg,
  UpdateProg,
  deleteOnceProg,
  deleteAll,
  getProgrammesWithCours,
} from "../controllers/programme.js";
import multer from "../middlewares/multer-config.js";


const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Programme:
 *       type: object
 *       properties:
 *         Titre:
 *           type: string
 *           description: The title of the program.
 *         descriptionProgramme:
 *           type: string
 *           description: The description of the program.
 *         image:
 *           type: string
 *           description: The image URL for the program.
 *       required:
 *         - Titre
 *         - descriptionProgramme
 *         - image
 */
/**
 * @swagger
 * /programme:
 *   post:
 *     summary: Create a new program.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Programme'
 *     responses:
 *       '201':
 *         description: Successful creation of a program.
 *       '400':
 *         description: Bad request. Check the request body.
 *       '500':
 *         description: Internal server error.
 * 
 *   get:
 *     summary: Get all programs.
 *     responses:
 *       '200':
 *         description: Successful retrieval of all programs.
 *         content:
 *           application/json:
 *             example:
 *               - Titre: "Program Title 1"
 *                 descriptionProgramme: "Description 1"
 *                 image: "https://example.com/image1.jpg"
 *               - Titre: "Program Title 2"
 *                 descriptionProgramme: "Description 2"
 *                 image: "https://example.com/image2.jpg"
 *       '500':
 *         description: Internal server error.
 * 
 *   delete:
 *     summary: Delete all programs.
 *     responses:
 *       '200':
 *         description: Successful deletion of all programs.
 *       '500':
 *         description: Internal server error.
 */

router.route('/cours').get(getProgrammesWithCours);

router
  .route("/")
  .post(multer, AjouterProgramme)
  .get(getAllProg)
  .delete(deleteAll);

/**
 * @swagger
 * /programme/{Titre}:
 *   get:
 *     summary: Get a specific program by title.
 *     parameters:
 *       - in: path
 *         name: Titre
 *         required: true
 *         description: The title of the program to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of the specified program.
 *         content:
 *           application/json:
 *             example:
 *               Titre: "Program Title"
 *               descriptionProgramme: "Program Description"
 *               image: "https://example.com/image.jpg"
 *       '404':
 *         description: Program not found.
 *       '500':
 *         description: Internal server error.
 *   
 *   delete:
 *     summary: Delete a specific program by title.
 *     parameters:
 *       - in: path
 *         name: Titre
 *         required: true
 *         description: The title of the program to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful deletion of the specified program.
 *       '404':
 *         description: Program not found.
 *       '500':
 *         description: Internal server error.
 */

router
  .route("/:Titre")
  .get(getOnceProg)
  .delete(deleteOnceProg);
  /**
 * @swagger
 * /programme/{_id}:
 *   put:
 *     summary: Update a specific program by ID.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The ID of the program to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Programme'
 *     responses:
 *       '200':
 *         description: Successful update of the specified program.
 *         content:
 *           application/json:
 *             example:
 *               _id: "program_id_1"
 *               Titre: "Updated Program Title"
 *               descriptionProgramme: "Updated Program Description"
 *               image: "https://example.com/updated_image.jpg"
 *       '400':
 *         description: Bad request. Check the request body.
 *       '404':
 *         description: Program not found.
 *       '500':
 *         description: Internal server error.
 */

router.route("/:_id").put(multer,UpdateProg);


export default router;
