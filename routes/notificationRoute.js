import express from "express";
import {getAllnotif, getOnceNotif, deleteOnceNotif, deleteAllNotif} from "../controllers/notificationControllers.js"

const router = express.Router();

router
  .route("/")
  .get(getAllnotif)
  .delete(deleteAllNotif);

router
  .route("/:Titre")
  .get(getOnceNotif)
  .delete(deleteOnceNotif);


export default router;