import express from 'express'
import { saveEarthquakeDataToDatabase, processNewCatastrophesAndNotifyUsers } from '../controllers/usgs_api.js';

const router = express.Router();

router
.route('/fetch_save')
.get(saveEarthquakeDataToDatabase);

router
.route('/send')
.get(processNewCatastrophesAndNotifyUsers);

export default router;
