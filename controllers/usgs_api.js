import axios from "axios";
import Catastrophe from '../models/catastrophe.js';
import { getUsersInCatastropheRadius } from '../controllers/catastropheController.js'
import { sendNotificationToUser } from "./firebase.js";
import mongoose from "mongoose";

const fetchEarthquakeData = async () => {
    try {
      const response = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch earthquake data');
    }
  };
  
  const saveEarthquakeDataToDatabase = async () => {
    try {
      const earthquakeData = await fetchEarthquakeData();
  
      for (const feature of earthquakeData.features) {
        const {
          properties: { title, type, tsunami, place, mag, time },
          geometry: { coordinates },
        } = feature;
  
        const [longitude, latitude] = coordinates;
  
        const catastropheData = {
          titre: title,
          type: tsunami === 1 ? "Tsunami" : "Earthquake",
          description: place,
          date: time,
          radius: Math.pow(10, 0.5 * mag), 
          magnitude: mag,
          latitudeDeCatastrophe: latitude,
          longitudeDeCatastrophe: longitude,
        };
  
        const catastrophe = new Catastrophe(catastropheData);
        await catastrophe.save();
      }
    } catch (error) {
      console.error('Failed to fetch and save earthquake data:', error);
    }
  };

  const processNewCatastrophesAndNotifyUsers = async () => {
    try {
      // Fetch and save earthquake data to the database
      await saveEarthquakeDataToDatabase();
  
      // Retrieve the newly saved catastrophes
      const newCatastrophes = await Catastrophe.find();
  
      // Iterate through each new catastrophe
      for (const newCatastrophe of newCatastrophes) {
        // Fetch users within the radius of the new catastrophe
        const usersInRadius = await getUsersInCatastropheRadius(newCatastrophe);
  
        // Send notifications to users
        for (const user of usersInRadius) {
          sendNotificationToUser(user, newCatastrophe);
        }
      }
      console.log('Processing and notifying users completed successfully');
    } catch (error) {
      console.error('Error processing new catastrophes:', error);
    }
  };
  
  export { saveEarthquakeDataToDatabase,
    processNewCatastrophesAndNotifyUsers
  };