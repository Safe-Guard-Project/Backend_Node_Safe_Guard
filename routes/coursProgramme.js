import express from "express";
import {
  addRessource,
  getAll,
  getOnceRes,
  deleteOnceRess,deleteAll,Update,  getOnceByType
} from "../controllers/coursProgramme.js";
import multer from "../middlewares/multer-config.js";

const router = express.Router();

router.route("/").post(multer, addRessource).get(getAll).delete(deleteAll);
router
  .route("/:Type")
  .get(getOnceByType)
router.route("/:_id").get(getOnceRes).delete(deleteOnceRess).put(multer,Update);


export default router;
