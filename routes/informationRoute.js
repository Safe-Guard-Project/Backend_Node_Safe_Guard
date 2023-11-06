import express from "express";
import {
  AjouterInformation, getAllInformation, getOnceInfprmation, UpdateInforation, deleteOnceInformation, deleteAllInformation,
} from "../controllers/informationControlleers.js"
import multer from "../middlewares/multer-config.js";

const router = express.Router();

router
  .route("/")
  .post(multer, AjouterInformation)
  .get(getAllInformation)
  .delete(deleteAllInformation);

router
  .route("/:Titre")
  .get(getOnceInfprmation)
  .delete(deleteOnceInformation);

router.route("/:_id").put(multer,UpdateInforation);

export default router;