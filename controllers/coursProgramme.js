
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

export function getOnceByType (req, res) {
  CoursProgramme.find({ Type: req.params.Type })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
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
