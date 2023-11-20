import express from "express";
import { addCommentInfo, getAllCommentInfo,getOnceCommentInfo ,deleteAllcommentInfo, deleteOnceCommentInfo,UpdateCInfo} from "../controllers/commentairesInforamtionControlles.js";
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
const router = express.Router();

router
.route("/")
.post(addCommentInfo)
.get(getAllCommentInfo)
.delete(deleteAllcommentInfo);


router
.route("/:_id")
.get(getOnceCommentInfo)
.delete(deleteOnceCommentInfo)
.put(UpdateCInfo);

export default router;