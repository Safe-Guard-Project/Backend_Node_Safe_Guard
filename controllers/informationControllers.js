
import information from '../models/information.js';
//lesfonctions

export function AjouterInformation(req, res) {
 
  const dateDePrevention = new Date(req.body.dateDePrevention);
  const etat = req.body.etat === 0 ? 'Coming' : 'Ongoing';


  information.create({
  typeCatastrophe:req.body.typeCatastrophe,
  idUser:req.body.idUser,
  pays:req.body.pays,
  region:req.body.region,
  descriptionInformation:req.body.descriptionInformation,
  image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
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
/*function UpdateInformation(req, res) {
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
}*/


export function UpdateProg(req, res) {
  const { _id } = req.params;
  const updatedProgrammeData = req.body;
  if (req.file) {
    updatedProgrammeData.image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`// Mettez à jour le chemin de l'image si une nouvelle image est fournie
  }
    
  Programme.findByIdAndUpdate(_id, updatedProgrammeData )
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export async function UpdateInformation(req, res) {
  const {
    typeCatastrophe,
    pays,
    region,
    dateDePrevention,
    descriptionInformation,
    etat,
    image,
    pourcentageFiabilite
  } = req.body;

  if (!typeCatastrophe || !pays || !region || !descriptionInformation || !dateDePrevention || !image || !etat || !pourcentageFiabilite) {
    return res.status(400).json({ error: "Champs vides !" });
  }

  try {
    const updatedInformation = await information.findOneAndUpdate(
      { _id: req.params.id }, 
      {
        typeCatastrophe,
        pays,
        region,
        dateDePrevention,
        descriptionInformation,
        etat,
        image,
        pourcentageFiabilite
      },
      { new: true }
    );

    if (!updatedInformation) {
      return res.status(404).json({ error: 'Information not found' });
    }

    return res.status(200).json({ message: 'Information updated successfully', information: updatedInformation });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update information' });
  }
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