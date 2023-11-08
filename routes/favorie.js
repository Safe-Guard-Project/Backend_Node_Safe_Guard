
import { addFav, deleteAll, deleteOnceFav } from "../controllers/favorie.js";
import express from "express";
const router = express.Router();

router.route("/").post(addFav).delete(deleteAll);
router.route("/:_id").delete(deleteOnceFav);

export default router;
