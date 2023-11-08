import express from "express";
import { addCommentInfo, getAllCommentInfo,getOnceCommentInfo ,deleteAllcommentInfo, deleteOnceCommentInfo,UpdateCInfo} from "../controllers/commentairesInforamtionControlles.js";

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