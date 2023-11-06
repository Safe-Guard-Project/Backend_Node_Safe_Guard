import express from "express";
import {
  AjouterProgramme,
  getAllProg,
  getOnceProg,
  UpdateProg,
  deleteOnceProg,
  deleteAll,
} from "../controllers/programme.js";
import multer from "../middlewares/multer-config.js";

const router = express.Router();

router
  .route("/")
  .post(multer, AjouterProgramme)
  .get(getAllProg)
  .delete(deleteAll);

router
  .route("/:Titre")
  .get(getOnceProg)
  .delete(deleteOnceProg);

router.route("/:_id").put(multer,UpdateProg);

export default router;
