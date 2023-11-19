
import CoursProgramme from '../models/coursProgramme.js';
/*
export function addRessource(req, res) {
  const Image = req.file.mimetype.startsWith("image/");
  const Video = req.file.mimetype.startsWith("video/");

  if (Image) {
    CoursProgramme.create({
      description: req.body.description,
      idProgramme: req.body.idProgramme,
      image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
    })
      .then((newRess) => {
        res.status(200).json(newRess);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else if (Video) {
    CoursProgramme.create({
      description: req.body.description,
      idProgramme: req.body.idProgramme,
      video: `${req.protocol}://${req.get("host")}/video/${req.file.filename}`,
    })
      .then((newRess) => {
        res.status(200).json(newRess);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    res.status(400).json({ error: "Type de fichier non pris en charge." });
  }
}
*/
export function addRessource(req, res) {
 
  CoursProgramme.create({
    Type : req.body.Type ,
    description: req.body.description,
      idProgramme: req.body.idProgramme,
      image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
  })
    .then((newProg) => {
      res.status(200).json(newProg);
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

export function getOnceRes(req, res) {
    CoursProgramme.findById({ _id: req.params._id })
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
