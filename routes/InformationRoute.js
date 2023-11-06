import express from "express";
import {AjouterInformation,getAllInfo,getOnceInfo,UpdateInfo,deleteOnceInfo,deleteAll} from "../controllers/Information.js"

import multer from "../middlewares/multer-config.js";

const router = express.Router();

router 
.route("/")
.post( multer, AjouterInformation)
.get(getAllInfo)
.delete(deleteAll);

router
.route("/:Titre")
.get(getOnceInfo)
.delete(deleteOnceInfo);

router.route("/:_id").put(multer, UpdateInfo)

export default router;