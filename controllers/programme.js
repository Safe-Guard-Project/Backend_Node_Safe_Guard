import Programme from "../models/programme.js";
import CoursProgramme from '../models/coursProgramme.js';

import cloudinary from "../middlewares/cloudinary.js";


export async function AjouterProgramme(req, res) {
    try {
       const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path,  { resource_type: 'auto' });

        if (!Array.isArray(req.body.cours)) {
            return res.status(400).json({ error: "Le champ 'cours' doit être un tableau d'IDs de cours." });
        }

        const coursExistants = await Promise.all(req.body.cours.map(async (coursId) => {
            const coursExiste = await CoursProgramme.findById(coursId);
            return coursExiste !== null;
        }));

        if (coursExistants.includes(false)) {
            return res.status(400).json({ error: "Certains cours n'existent pas." });
        }
        
        const newProg = await Programme.create({
            Titre: req.body.Titre,
            descriptionProgramme: req.body.descriptionProgramme,
            image: cloudinaryResponse.secure_url,
            cours: req.body.cours,
        });

        res.status(200).json(newProg);
    } catch (error) {
        res.status(500).json({ error: error.message || "Une erreur inattendue s'est produite." });
    }

}

/*

export async function AjouterProgramme(req, res) {
  const cloudinaryy = await cloudinary.uploader.upload(req.file.path,  { resource_type: 'auto' });
 
  Programme.create({
    Titre: req.body.Titre,
    descriptionProgramme: req.body.descriptionProgramme,
    image: cloudinaryy.secure_url,
    cours: req.body.cours,
  })
    .then((newProg) => {
      res.status(200).json(newProg);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
*/


export function getProgrammesWithCours(req, res) {
  Programme.find({})
    .populate('cours')
    .exec()
    .then((programmes) => {
      res.status(200).json(programmes);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getAllProg(req, res) {
  Programme.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getOnceProg(req, res) {
  Programme.findOne({ Titre: req.params.Titre })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
}
/*
export function UpdateProg(req, res) {
  const { _id } = req.params;
  const updatedProgrammeData = req.body;
  if (req.file) {
    updatedProgrammeData.image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
  }
    
  Programme.findByIdAndUpdate(_id, updatedProgrammeData )
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
*/

export async function UpdateProg(req, res) {
  try {
    const { _id } = req.params;
    const updatedProgrammeData = req.body;

    if (req.file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' });
      updatedProgrammeData.image = cloudinaryResponse.secure_url;
    }

    if (!Array.isArray(updatedProgrammeData.cours)) {
      return res.status(400).json({ error: "Le champ 'cours' doit être un tableau d'IDs de cours." });
    }

    const coursExistants = await Promise.all(updatedProgrammeData.cours.map(async (coursId) => {
      const coursExiste = await CoursProgramme.findById(coursId);
      return coursExiste !== null;
    }));

    if (coursExistants.includes(false)) {
      return res.status(400).json({ error: "Certains cours n'existent pas." });
    }

    const updatedProg = await Programme.findByIdAndUpdate(_id, updatedProgrammeData, { new: true });

    if (!updatedProg) {
      return res.status(404).json({ error: "Programme non trouvé." });
    }

    res.status(200).json(updatedProg);
  } catch (error) {
    res.status(500).json({ error: error.message || "Une erreur inattendue s'est produite." });
  }
}

/*
export async function UpdateProg(req, res) {
  const { _id } = req.params;
  const updatedCoursData = req.body;

  try {
    if (req.file) {
    
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' });
      updatedCoursData.image = cloudinaryResponse.secure_url;
    }

    const updatedCours = await Programme.findByIdAndUpdate(_id, updatedCoursData, { new: true });

    res.status(200).json(updatedCours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Erreur lors de la mise à jour de la ressource.' });
  }
}*/
export function deleteAll(req, res) {
  Programme.deleteMany({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function deleteOnceProg(req, res) {
  Programme.findOneAndDelete({ Titre: req.params.Titre })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export async function getStatistiqueNombreCoursParProgramme(req, res) {
  try {
    const programmes = await Programme.find().populate("cours");
    const statistiques = [];

    programmes.forEach((programme) => {
      const nombreCours = programme.cours.length;
      statistiques.push({
        programmeId: programme._id,
        titreProgramme: programme.Titre,
        nombreCours: nombreCours,
      });
    });

    return res.status(200).json(statistiques);
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

// Add this function at the bottom of your existing code
export async function getTotalNombreProgrammes(req, res) {
  try {
    const programmes = await Programme.find();
    const totalNumberOfPrograms = programmes.length;

    return res.status(200).json({ totalNumberOfPrograms });
  } catch (error) {
    console.error("Erreur lors du calcul du nombre total de programmes :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}