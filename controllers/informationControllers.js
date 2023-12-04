
import information from '../models/information.js';
//lesfonctions

export function AjouterInformation(req, res) {
  const dateDePrevention = new Date(req.body.dateDePrevention);
  const etat = req.body.etat === 0 ? 'Coming' : 'Ongoing';

  let imageFileName = null;

  // Vérifier si un fichier a été téléchargé
  if (req.file) {
      imageFileName = req.file.filename;
  }

  information.create({
      titre: req.body.titre,
      typeCatastrophe: req.body.typeCatastrophe,
      idUser: req.body.idUser,
      pays: req.body.pays,
      region: req.body.region,
      descriptionInformation: req.body.descriptionInformation,
      image: imageFileName, // Utiliser le nom du fichier ou null
      dateDePrevention,
      pourcentageFiabilite: req.body.pourcentageFiabilite,
      etat,
  })
      .then((newInformation) => {
          res.status(200).json(newInformation);
      })
      .catch((err) => {
          res.status(500).json({ error: err });
      });
}



export function UpdateInformation(req, res) {
  const { _id } = req.params;
  const updatedInfoData = req.body;
  if (req.file) {
    updatedInfoData.image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`// Mettez à jour le chemin de l'image si une nouvelle image est fournie
  }
    
  information.findByIdAndUpdate(_id, updatedInfoData )
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


      export function getAllInformation(req, res) {
  information.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getByIdInformation(req, res) {
  information.findOne({ _id: req.params._id })
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
  information.findOneAndDelete({ _id: req.params._id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}