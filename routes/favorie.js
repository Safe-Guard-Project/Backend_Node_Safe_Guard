import { addFav, deleteAll, deleteOnceFav, getAllFav , getFavWithCours ,getStatistiqueNombreFavorisParTypeCours} from "../controllers/favorie.js";
import express from "express";
const router = express.Router();
router.route('/cours').get(getFavWithCours);
router.route("/").post(addFav).delete(deleteAll).get(getAllFav);
router.route("/stat").get(getStatistiqueNombreFavorisParTypeCours);
router.route("/:_id").delete(deleteOnceFav);

export default router;