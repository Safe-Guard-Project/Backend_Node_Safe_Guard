import  Favorie  from "../models/favorie.js";
export function addFav(req, res) {
  Favorie.create({
    
    idCoursProgramme: req.body.idCoursProgramme,
  })
    .then((newVd) => {
      res.status(200).json(newVd);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function getAllFav(req, res) {
 Favorie.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function deleteAll(req, res) {
  Favorie.deleteMany({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function deleteOnceFav(req, res) {
  Favorie.findByIdAndDelete({ _id: req.params._id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}