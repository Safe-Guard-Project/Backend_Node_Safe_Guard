import express from "express";
import {AjouterInformation, getAllInformation, getByIdInformation,UpdateInformation, deleteOnceInformation, deleteAllInformation} from "../controllers/informationControllers.js"
import multer from "../middlewares/multer-config.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     CommentairesInformation:
 *       type: object
 *       properties:
 *         idUser:
 *           type: string
 *           description: The ID of the user who made the comment.
 *         idInformation:
 *           type: string
 *           description: The ID of the information associated with the comment.
 *         descriptionCommentaire:
 *           type: string
 *           description: The description or content of the comment.
 *       required:
 *         - idUser
 *         - idInformation
 *         - descriptionCommentaire
 */



/**
 * @swagger
 * /information:
 *   get:
 *     summary: Get all information entries
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /information:
 *   delete:
 *     summary: Delete all information entries
 *     responses:
 *       '200':
 *         description: All information entries deleted successfully
 *       '500':
 *         description: Internal server error
 */



router
  .route("/")
  .post(multer, AjouterInformation)
  .get(getAllInformation)
  .delete(deleteAllInformation);


/**
 * @swagger
 * /information/{_id}:
 *   get:
 *     summary: Get a specific information entry by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the information to get
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /information/{_id}:
 *   delete:
 *     summary: Delete a specific information entry by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the information to delete
 *     responses:
 *       '200':
 *         description: Information deleted successfully
 *       '500':
 *         description: Internal server error
 */

  router
  .route("/:_id")
  .get(getByIdInformation)
  .delete(deleteOnceInformation);



/**
 * @swagger
 * /information/{_id}:
 *   put:
 *     summary: Update an existing information entry
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the information to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               typeCatastrophe:
 *                 type: string
 *               idUser:
 *                 type: string
 *               pays:
 *                 type: string
 *               region:
 *                 type: string
 *               descriptionInformation:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *               dateDePrevention:
 *                 type: string
 *                 format: date
 *               pourcentageFiabilite:
 *                 type: number
 *               etat:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Information updated successfully
 *       '500':
 *         description: Internal server error
 */
//swagger

router.route("/:_id").put(multer, UpdateInformation);

export default router;
