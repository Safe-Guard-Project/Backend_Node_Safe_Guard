import express from "express";
import {
  addComment,
  getAllComment,
  getOnceComment,
  deleteAll,
  deleteOnceComment,UpdateC
} from "../controllers/commentairesProgramme.js";

const router = express.Router();

router.route("/").post(addComment).get(getAllComment).delete(deleteAll);
router.route("/:_id").get(getOnceComment).delete(deleteOnceComment).put(UpdateC);

export default router;
