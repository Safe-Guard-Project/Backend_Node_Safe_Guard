import express from "express";
import { createQuiz, getAllQuiz, getOnceQuiz ,deleteAllQuiz,deleteOnceQuiz,UpdateQ } from "../controllers/quiz.js";
const router = express.Router();
router.route("/").post(createQuiz).get(getAllQuiz).delete(deleteAllQuiz);
router.route("/:_id").get(getOnceQuiz).delete(deleteOnceQuiz).put(UpdateQ);
export default router;
