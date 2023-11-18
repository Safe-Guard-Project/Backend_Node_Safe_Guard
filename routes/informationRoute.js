import express from "express";
import {AjouterInformation, getAllInformation, getByIdInformation,UpdateInformation, deleteOnceInformation, deleteAllInformation, UpdateProg} from "../controllers/informationControllers.js"
import multer from "../middlewares/multer-config.js";

const router = express.Router();

router
  .route("/")
  .post(multer, AjouterInformation)
  .get(getAllInformation)
  .delete(deleteAllInformation);

router
  .route("/:_id")
  .get(getByIdInformation)
  .delete(deleteOnceInformation);





router.route("/:_id").put(multer, UpdateInformation);

export default router;
