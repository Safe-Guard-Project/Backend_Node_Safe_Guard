import express from "express";
import { createQuestion, getAllQuestion, getOnceQuestions ,deleteAllQuestions,deleteOnceQuestions,UpdateQuestions } from "../controllers/questions.js"
const router = express.Router();
router.route("/").post(createQuestion).get(getAllQuestion).delete(deleteAllQuestions);
router.route("/:_id").get(getOnceQuestions).delete(deleteOnceQuestions).put(UpdateQuestions);
export default router;
