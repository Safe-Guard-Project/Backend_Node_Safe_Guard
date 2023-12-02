import Programme from "../models/programme.js";
import CoursProgramme from '../models/coursProgramme.js';
/*
export function AjouterProgramme(req, res) {
 
  Programme.create({
    Titre: req.body.Titre,
    descriptionProgramme: req.body.descriptionProgramme,
    image: `${req.file.filename}`,
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
export async function AjouterProgramme(req, res) {
    try {
        if (!Array.isArray(req.body.cours)) {
            return res.status(400).json({ error: "Le champ 'cours' doit être un tableau d'IDs de cours." });
        }

        // Vérifier si les cours existent avant de les ajouter
        const coursExistants = await Promise.all(req.body.cours.map(async (coursId) => {
            const coursExiste = await CoursProgramme.findById(coursId);
            return coursExiste !== null;
        }));

        if (coursExistants.includes(false)) {
            return res.status(400).json({ error: "Certains cours n'existent pas." });
        }

        // Tous les cours existent, on peut créer le programme
        const newProg = await Programme.create({
            Titre: req.body.Titre,
            descriptionProgramme: req.body.descriptionProgramme,
            image: `${req.file.filename}`,
            cours: req.body.cours,
        });

        res.status(200).json(newProg);
    } catch (error) {
        res.status(500).json({ error: error.message || "Une erreur inattendue s'est produite." });
    }

}

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
