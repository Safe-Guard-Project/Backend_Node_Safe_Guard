import { addFav, deleteAll,getAllFav, deleteOnceFav } from "../controllers/favorie.js";
import express from "express";
const router = express.Router();
router.route("/").post(addFav).delete(deleteAll).get(getAllFav);
router.route("/:_id").delete(deleteOnceFav);

export default router;