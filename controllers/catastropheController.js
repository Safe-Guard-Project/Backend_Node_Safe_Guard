import Catastrophe from '../models/catastrophe.js';
import User from '../models/user.js'
import mongoose from 'mongoose';

// Create a catastrophe

function addCatastrophe(req, res) {
    const { titre, type, tsunami, description, date, radius, magnitude, latitudeDeCatastrophe, longitudeDeCatastrophe } = req.body;
    Catastrophe.create({
        titre,
        type,
        tsunami,
        description,
        date,
        radius,
        magnitude,
        latitudeDeCatastrophe,
        longitudeDeCatastrophe
    })
    .then(newCatastrophe => {
        res.status(200).json(newCatastrophe);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

// Get all catastrophes
function getAllCatastrophes(req, res) {
    Catastrophe.find()
        .then(catastrophes => {
            res.status(200).json(catastrophes);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

// Get a catastrophe by ID
function getCatastropheById(req, res) {
    Catastrophe.findById(req.params.id)
        .then(catastrophe => {
            res.status(200).json(catastrophe);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

// Update a catastrophe by ID
function updateCatastropheById(req, res) {
    const catastropheId = req.params.id; 
    const updatedCatastropheData = req.body; 
    Catastrophe.findByIdAndUpdate(req.params.id, req.body)
      .then(updatedCatastrophe => {
        if (!updatedCatastrophe) {
          return res.status(404).json({ message: "Catastrophe non trouvée" });
        }
        res.status(200).json(updatedCatastrophe);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
}

// Delete all catastrophes
function deleteAllCatastrophes(req, res) {
    Catastrophe.deleteMany({}) 
        .then(catastrophes => {
            res.status(200).json(catastrophes);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

// Delete a catastrophe by ID
function deleteCatastropheById(req, res) {
    Catastrophe.findByIdAndDelete(req.params.id)
    .then(deletedCatastrophe => {
        if (!deletedCatastrophe) {
            return res.status(404).json({ message: "Catastrophe non trouvée" });
        }
        res.status(204).send();
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

const getUsersInCatastropheRadius = async (catastrophe) => {
    try {
      const { latitudeDeCatastrophe, longitudeDeCatastrophe, radius } = catastrophe;
  
      // Find users within a rectangular region
      const usersInRadius = await User.find({
        latitudeDeUser: {
          $gte: latitudeDeCatastrophe - radius,
          $lte: latitudeDeCatastrophe + radius,
        },
        longitudeDeUser: {
          $gte: longitudeDeCatastrophe - radius,
          $lte: longitudeDeCatastrophe + radius,
        },
      });
      console.log('Users in catastrophe radius:', usersInRadius);
  
      return usersInRadius;
    } catch (error) {
      console.error('Error fetching users in catastrophe radius:', error);
      throw new Error('Failed to fetch users in catastrophe radius');
    }
  };
  

export {
    addCatastrophe,
    getAllCatastrophes,
    getCatastropheById,
    updateCatastropheById,
    deleteCatastropheById,
    deleteAllCatastrophes,
    getUsersInCatastropheRadius
};
