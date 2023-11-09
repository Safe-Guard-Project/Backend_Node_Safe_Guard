
import information from '../models/information.js';
//lesfonctions

export function AjouterInformation(req, res) {
 
  const dateDePrevention = new Date(req.body.dateDePrevention);

  information.create({
  typeCatastrophe:req.body.typeCatastrophe,
  idUser:req.body.idUser,
  pays:req.body.pays,
  region:req.body.region,
  descriptionInformation:req.body.descriptionInformation,
  image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
  dateDePrevention,
  pourcentageFiabilite: req.body.pourcentageFiabilite,
  etat: req.body.etat,
  })
    .then((newInformation) => {
      res.status(200).json(newInformation);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
function UpdateInformation(req, res) {
  const informationid = req.params.id;  
    alert.findByIdAndUpdate(req.params.id, req.body)
    .then(UpdateInformation => {
      if (!UpdateInformation) {
        return res.status(404).json({ message: "Information non trouvée" });
      }
      res.status(200).json(UpdateInformation);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
/*export function UpdateInformation(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ error: validationResult(req).array() });
  } else {
    const { information } = req.params;

information
      .findOne({ information: information })
      .then((newInformation) => {


        if (req.body.typeCatastrophe) {
          newInformation.typeCatastrophe = req.body.typeCatastrophe;
        }
        if (req.body.idUser) {
          newInformation.idUser = req.body.idUser;
        }
        if (req.body.pays) {
          newInformation.pays = req.body.pays;
        }
        if (req.body.region) {
          newInformation.region = req.body.region;
        }
        if (req.body.descriptionInformation) {
          newInformation.descriptionInformation = req.body.descriptionInformation;
        }
        if (req.body.dateDePrevention) {
          newInformation.dateDePrevention = req.body.dateDePrevention;
        }
        if (req.file) {
          newInformation.image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`;
        }
        if (req.body.pourcentageFiabilite) {
          newInformation.pourcentageFiabilite = req.body.pourcentageFiabilite;
        }
        if (req.body.etat) {
          newInformation.etat = req.body.etat;
        }
information    
          .save()
          .then((updatedInformation) => {
            res.status(200).json(updatedInformation);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}*/

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