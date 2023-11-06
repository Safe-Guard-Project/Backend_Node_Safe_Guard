import express from "express";
import {
  AjouterInformation, getAllInformation, getOnceInformation, UpdateInformation, deleteOnceInformation, deleteAllInformation} from "../controllers/informationControlleers.js"
import multer from "../middlewares/multer-config.js";

const router = express.Router();

router
  .route("/")
  .post(multer, AjouterInformation)
  .get(getAllInformation)
  .delete(deleteAllInformation);

router
  .route("/:Titre")
  .get(getOnceInformation)
  .delete(deleteOnceInformation);

router.route("/:_id").put(multer,UpdateInformation);

export default router;