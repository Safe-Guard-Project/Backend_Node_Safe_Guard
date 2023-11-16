import  CommentairesProgramme  from "../models/commentairesProgramme.js";

export function addComment(req, res) {
  CommentairesProgramme.create({
    textCommentaire: req.body.textCommentaire,
    idProgramme: req.body.idProgramme,
    idUser: req.body.idUser,
  })
    .then((newProg) => {
      res.status(200).json(newProg);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getAllComment(req, res) {
  CommentairesProgramme.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getOnceComment(req, res) {
    
  CommentairesProgramme.findById({_id : req.params._id})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function UpdateC(req, res) {
   
    CommentairesProgramme.findByIdAndUpdate(req.params._id, req.body)
        .then((updatedComment) => {
            res.status(200).json(updatedComment);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};


export function deleteAll(req, res) {
  CommentairesProgramme.deleteMany({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function deleteOnceComment(req, res) {
  CommentairesProgramme.findOneAndDelete({ _id: req.params._id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
