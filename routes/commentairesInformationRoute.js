import express from "express";
import {
  addCommentInfo,
  getAllCommentInfo,
  getOnceCommentInfo,
  deleteAllC,
  deleteOnceCommentInfo,
  UpdateCommentInfo
} from "../controllers/commentairesInformation.js"

const router = express.Router();

router.
route("/")
.post(addCommentInfo)
.get(getAllCommentInfo)
.delete(deleteAllC);
router.
route("/:_id")
.get(getOnceCommentInfo)
.delete(deleteOnceCommentInfo)
.put(UpdateCommentInfo);

export default router;