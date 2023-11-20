import commentairesInformation   from "../models/commentairesInformation.js"




export function addCommentInfo(req, res) {
  const { idInformation, descriptionCommentaire } = req.body;

  if (!idInformation || !descriptionCommentaire) {
    return res.status(400).json({ error: "Champs vides !" });
  }

  const nouveauCommentaireInformation = new commentairesInformation({
    idInformation: idInformation,
    descriptionCommentaire: descriptionCommentaire
  });

  nouveauCommentaireInformation
    .save()
    .then((nouveaucommentairesInformation) => {
      res.status(200).json(nouveaucommentairesInformation);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function getAllCommentInfo(req, res) {
  commentairesInformation.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getOnceCommentInfo(req, res) {
    
  commentairesInformation.findById({_id : req.params._id})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function UpdateCInfo(req, res) {
   
  commentairesInformation.findByIdAndUpdate(req.params._id, req.body)
        .then((updatedComment) => {
            res.status(200).json(updatedComment);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};


export function deleteAllcommentInfo(req, res) {
  commentairesInformation.deleteMany({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function deleteOnceCommentInfo(req, res) {
  commentairesInformation.findOneAndDelete({ _id: req.params._id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}