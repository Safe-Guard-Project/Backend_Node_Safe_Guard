
import CoursProgramme from '../models/coursProgramme.js';
import Programme from '../models/programme.js';
export function addRessource(req, res) {
 
  CoursProgramme.create({
    Type : req.body.Type ,
    description: req.body.description,
    image: `${req.file.filename}`,
  })
    .then((newProg) => {
      res.status(200).json(newProg);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
// export async function addRessource(req, res) {
  

//     const idProgramme = req.params.idProgramme;
//     const programmeExists = await Programme.exists({ _id: idProgramme });

//     if (!programmeExists) {
//       return res.status(404).json({ error: 'Le programme n\'existe pas.' });
//     }

//     CoursProgramme.create({
//           Type : req.body.Type ,
//           description: req.body.description,
//           idProgramme: idProgramme,
//           image: `${req.file.filename}`,
//         })
//           .then((newProg) => {
//             res.status(200).json(newProg);
//           })
//           .catch((err) => {
//             res.status(500).json({ error: err });
//           });
// }
      


export function getCoursByProgrammeId(req, res) {
  const programmeId = req.params.programmeId;
  CoursProgramme.find({ idProgramme: programmeId })
  .then((docs) => {
    res.status(200).json(docs);
  })
  .catch((err) => {
    res.status(500).json({ error: err });
  });
}

export function getAll(req, res) {
    CoursProgramme.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
/*
export function getOnceByType (req, res) {
  CoursProgramme.find({ Type: req.params.Type })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
}
*/
/*
export async function getCoursByType(req, res) {
  try {
    const { programmeId, Type } = req.params;
    const programme = await Programme.findById(programmeId);
  
    if (!programme) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }
    const coursList = await CoursProgramme.find({
      idProgramme: programme._id,
      Type: Type,
    });

    res.status(200).json(coursList);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des cours' });
  }
}
*/
/*
export async function getCoursByType(req, res) {
  try {
    const { programmeId, coursType } = req.params;

    // Récupérer le programme par son ID
    const programme = await Programme.findById(programmeId);

    if (!programme) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }

    // Utiliser la méthode populate pour récupérer les détails des cours associés au programme par type
    const coursList = await CoursProgramme.find({
      idProgramme: programme._id,
      Type: coursType,
    });

    res.status(200).json(coursList);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des cours' });
  }
}
*/
/*
export async function getCoursByType(req, res) {
  try {
    const { programmeId, coursType } = req.params;
    const programme = await Programme.findById(programmeId);

    if (!programme) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }

    const coursList = await CoursProgramme.find({
      _id: { $in: programme.cours },
      Type: coursType,
    });

    res.status(200).json(coursList);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des cours' });
  }
}
*/
export async function getCoursByType(req, res) {
  try {
    const { programmeId, coursType } = req.params;

    // Vérifier si le programme existe
    const programme = await Programme.findById(programmeId);

    if (!programme) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }

    // Rechercher les cours par type et ID de programme
    const coursList = await CoursProgramme.find({
      _id: { $in: programme.cours },
      Type: coursType,
    });

    if (coursList.length === 0) {
      return res.status(404).json({ message: `Aucun cours de type ${coursType} trouvé pour le programme spécifié.` });
    }

    res.status(200).json(coursList);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des cours' });
  }
}


export function Update(req, res) {
  const { _id } = req.params;
  const updatedCoursData = req.body;
  if (req.file) {
    updatedCoursData.image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
  }
    
  CoursProgramme.findByIdAndUpdate(_id, updatedCoursData)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function deleteOnceRess(req, res) {
    CoursProgramme.findOneAndDelete({ _id: req.params._id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function deleteAll(req, res) {
    CoursProgramme.deleteMany({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
