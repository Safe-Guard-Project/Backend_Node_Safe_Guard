import express from "express";
import {
  addRessource,
  getAll,
  deleteOnceRess,
  deleteAll,
  Update,
  getOnceByType, getOneCours

  //getCoursByType,
} from "../controllers/coursProgramme.js";
import multer from "../middlewares/multer-config.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     CoursProgramme:
 *       type: object
 *       properties:
 *         Type:
 *           type: string
 *           enum: [Introduction, CAUSE, CONSEQUENCE, SIGNE, Agir]
 *           description: The type of the course.
 *         image:
 *           type: string
 *           description: The image URL for the course.
 *         description:
 *           type: string
 *           description: The description of the course.
 *         idProgramme:
 *           type: string
 *           format: uuid
 *           description: The ID of the associated program.
 *       required:
 *         - Type
 *         - image
 *         - description
 *         - idProgramme
 */

/**
 * @swagger
 * /cours:
 *   post:
 *     summary: Create a new course for a program.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CoursProgramme'
 *     responses:
 *       '201':
 *         description: Successful creation of a course for a program.
 *       '400':
 *         description: Bad request. Check the request body.
 *       '500':
 *         description: Internal server error.
 *
 *   get:
 *     summary: Get all courses.
 *     responses:
 *       '200':
 *         description: Successful retrieval of all courses.
 *         content:
 *           application/json:
 *             example:
 *               - Type: Introduction
 *                 image: "https://example.com/image1.jpg"
 *                 description: "Introduction to the program"
 *                 idProgramme: "programme_id_1"
 *               - Type: CAUSE
 *                 image: "https://example.com/image2.jpg"
 *                 description: "Cause of the program"
 *                 idProgramme: "programme_id_1"
 *       '500':
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete all courses.
 *     responses:
 *       '200':
 *         description: Successful deletion of all courses.
 *       '500':
 *         description: Internal server error.
 */


router.route("/").post(multer, addRessource).get(getAll).delete(deleteAll);

router
  .route("/:Type")
  .get(getOnceByType)

//router.route("/:programmeId/:coursType").get(getCoursByType);
router.route("/:_id").delete(deleteOnceRess).put(multer, Update).get(getOneCours);

export default router;
