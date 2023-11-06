
import information from '../models/information.js';

export function AjouterInformation(req, res) {
    const {  typeCatastrophe , iduser, pays ,region, descriptionInformation, dateDePrevention, etat, pourcentageFiabilite } = req.body;
    const newInformation = new information({  typeCatastrophe , iduser, pays ,region, descriptionInformation, dateDePrevention, etat, pourcentageFiabilite });
    newInformation.save()
        .then(savedInformation => res.json(savedInformation))
        .catch(err => res.status(400).json(err));
}

export function UpdateInformation(req, res) {
    const idInformation = req.params.id;
    information.findByIdAndUpdate(idInformation, req.body)
        .then((updatedInformation) => {
            res.status(200).json(updatedInformation);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};



export function getAllInformation(req, res) {
  information.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getOnceInformation(req, res) {
  information.findOne({ typeCatastrophe: req.params.typeCatastrophe })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
}



export function deleteAllInformation(req, res) {
  information.deleteMany({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function deleteOnceInformation(req, res) {
  information.findOneAndDelete({ typeCatastrophe: req.params.typeCatastrophe })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}