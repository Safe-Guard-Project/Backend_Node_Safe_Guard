import express from "express";
import {
  addComment,
  getAllComment,
  getOnceComment,
  deleteAll,
  deleteOnceComment,UpdateC
} from "../controllers/commentairesProgramme.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     CommentairesProgramme:
 *       type: object
 *       properties:
 *         textComment:
 *           type: string
 *           description: The text of the comment.
 *         idCoursProgramme:
 *           type: string
 *           format: uuid
 *           description: The ID of the associated course program.
 *         idUser:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who posted the comment.
 *       required:
 *         - textComment
 *         - idCoursProgramme
 *         - idUser
 */
/**
 * @swagger
 * /commentairesProgramme:
 *   post:
 *     summary: Create a new comment for a course program.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentairesProgramme'
 *     responses:
 *       '201':
 *         description: Successful creation of a comment for a course program.
 *       '400':
 *         description: Bad request. Check the request body.
 *       '500':
 *         description: Internal server error.
 * 
 *   get:
 *     summary: Get all comments.
 *     responses:
 *       '200':
 *         description: Successful retrieval of all comments.
 *         content:
 *           application/json:
 *             example:
 *               - textComment: "Great course!"
 *                 idCoursProgramme: "cours_programme_id_1"
 *                 idUser: "user_id_1"
 *               - textComment: "Very informative"
 *                 idCoursProgramme: "cours_programme_id_1"
 *                 idUser: "user_id_2"
 *       '404':
 *         description: No comments found.
 *       '500':
 *         description: Internal server error.
 * 
 *   delete:
 *     summary: Delete all comments.
 *     responses:
 *       '200':
 *         description: Successful deletion of all comments.
 *       '500':
 *         description: Internal server error.
 */

router.route("/").post(addComment).get(getAllComment).delete(deleteAll);
router.route("/:_id").get(getOnceComment).delete(deleteOnceComment).put(UpdateC);

export default router;
