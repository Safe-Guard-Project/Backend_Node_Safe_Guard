import TrajetSecurise from '../models/tarjetSecurise.js';
import User from '../models/user.js';
import Catastrophe from '../models/catastrophe.js';
import mongoose from 'mongoose';

import user from '../models/user.js';


export function createTarjetSecurise(req, res) {
    const { etat, iduser, idCatastrophe } = req.body;
    const newTrajetSecurise = new TrajetSecurise({ etat, iduser, idCatastrophe });
    newTrajetSecurise.save()
        .then(savedTrajetSecurise => res.json(savedTrajetSecurise))
        .catch(err => res.status(400).json(err));
}


export function getTrajetSecurises(req, res) {
    TrajetSecurise.find()
        .then(
            TrajetSecurise => res.status(200).json(TrajetSecurise)
        )
        .catch(err => res.status(400).json(err));
}



export function updateTrajetSecurise(req, res) {
    const trajetId = req.params.id;
    TrajetSecurise.findByIdAndUpdate(trajetId, req.body)
        .then((updatedTrajet) => {
            res.status(200).json(updatedTrajet);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

// when we use querys in the post mqn we need to get it from req.query.variableName
// when we need it from pamas we need to send the request withiout ?id= and get it from req.params.variableName
export function getusersByTrajet(req, res) {
    console.log("hello", req.params);
    const { latitudeDeCatastrophe, longitudeDeCatastrophe, radius } = req.params;
    User.find({
        latitudeDeUser: { $gte: latitudeDeCatastrophe - radius, $lte: latitudeDeCatastrophe + radius },
        longitudeDeUser: { $gte: longitudeDeCatastrophe - radius, $lte: longitudeDeCatastrophe + radius }
    })
        .then(user => { console.log(user); res.status(200).json(user) })
        .catch(err => res.status(400).json(err));
}
export function getTrajetSecuriseById(req, res) {
    const trajetId = req.params.id;
    TrajetSecurise.findById(trajetId)
        .then((trajet) => {
            res.status(200).json(trajet);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
}
export function getUserPosition(req, res) {
    const userId = req.params.id;
    User.findById(userId)
        .then((user) => {
            res.status(200).json({ latitude: user.latitudeDeUser, longitude: user.longitudeDeUser });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
}



export function chnageEtatTotrue(req, res) {
    const trajetId = req.params.id;
    TrajetSecurise.findByIdAndUpdate(trajetId, { etat: true })
        .then((updatedTrajet) => {
            res.status(200).json(updatedTrajet);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
}
export function chnageEtatTotrueWithIdUser(iduser) {
    TrajetSecurise.findOneAndUpdate({ iduser: iduser }, { etat: true })
        .then((updatedTrajet) => {
            console.log(updatedTrajet);
        })
        .catch((err) => {
            console.log(err);
        });
    }


export function chnageEtatTofalse(req, res) {
    const trajetId = req.params.id;
    TrajetSecurise.findByIdAndUpdate(trajetId, { etat: false })
        .then((updatedTrajet) => {
            res.status(200).json(updatedTrajet);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
}



export function getUserPositionIndanger(req, res) {
    const { latitudeDeCatastrophe, longitudeDeCatastrophe, radius } = req.query;
    user.find({
        latitudeDeUser: { $gte: latitudeDeCatastrophe - radius, $lte: latitudeDeCatastrophe + radius },
        longitudeDeUser: { $gte: longitudeDeCatastrophe - radius, $lte: longitudeDeCatastrophe + radius }
    })
        .then(user => { res.status(200).json({ latitude: user.latitudeDeUser, longitude: user.longitudeDeUser }) })
        .catch(err => res.status(400).json(err));
}





export function getUserPositionIndangerEtatTrue(req, res) {
    const { latitudeDeCatastrophe, longitudeDeCatastrophe, radius } = req.params;
    User.find({
        latitudeDeUser: { $gte: latitudeDeCatastrophe - radius, $lte: latitudeDeCatastrophe + radius },
        longitudeDeUser: { $gte: longitudeDeCatastrophe - radius, $lte: longitudeDeCatastrophe + radius }
    })
    .then(users => {
        const userIds = users.map(user => user.id);
    
        TrajetSecurise.find({
            iduser: { $in: userIds },
            etat: true
        })
        .then(trajets => {
            const trajetUserIds = trajets.map(trajet => trajet.iduser);
            const usersWithTrajet = users.filter(user => trajetUserIds.includes(user.id));
            res.status(200).json(usersWithTrajet);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    });
}

export function getUserPositionIndangerEtatFalse(req, res) {
    const { latitudeDeCatastrophe, longitudeDeCatastrophe, radius } = req.query;
    user.find({
        latitudeDeUser: { $gte: latitudeDeCatastrophe - radius, $lte: latitudeDeCatastrophe + radius },
        longitudeDeUser: { $gte: longitudeDeCatastrophe - radius, $lte: longitudeDeCatastrophe + radius },

    })
    .then(users => {
        const userIds = users.map(user => user.id);
    
        TrajetSecurise.find({
            iduser: { $in: userIds },
            etat: false
        })
        .then(trajets => {
            const trajetUserIds = trajets.map(trajet => trajet.iduser);
            const usersWithTrajet = users.filter(user => trajetUserIds.includes(user.id));
            res.status(200).json(usersWithTrajet);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    });
}

      

export function deleteTrajetSecurise(req, res) {
    const trajetId = req.params.id;
    TrajetSecurise.findByIdAndDelete(trajetId)
        .then(() => {
            res.status(200).send();
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
}

export function getCatastropheRadius(req, res) {
    const catastropheId = req.params.id;
    Catastrophe.findById(catastropheId)
        .then((catastrophe) => {
            res.status(200).json({ radius: catastrophe.radius });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
}


export function getCatastropheRadiusLatidtudeAndlongitude(req, res) {
    const catastropheId = req.params.id;
    Catastrophe.findById(catastropheId)
        .then((catastrophe) => {
            res.status(200).json({ latitude: catastrophe.latitudeDeCatastrophe, longitude: catastrophe.longitudeDeCatastrophe, radius: catastrophe.radius });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
}
