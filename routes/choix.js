import express from "express";
import { createChoix, getAllChoix, getOnceChoix ,deleteAllChoix,deleteOnceChoix,UpdateChoix } from "../controllers/choix.js"
const router = express.Router();
router.route("/").post(createChoix).get(getAllChoix).delete(deleteAllChoix);
router.route("/:_id").get(getOnceChoix).delete(deleteOnceChoix).put(UpdateChoix);
export default router;