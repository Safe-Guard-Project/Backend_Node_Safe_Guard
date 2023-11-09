import commentairesInformation  from "../models/commentairesInformation.js"
export function addCommentInfo(req, res) {

  information.create({
  idUser:req.body.idUser,
  idInformation: req.body.idInformation,
descriptionCommentaire: req.body.descriptionCommentaire
    .then((newcommentInformation) => {
      res.status(200).json(newcomenntInformation);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
  })
}
/*export function addCommentInfo(req, res) {
  commentairesInformation.create({
    idUser:req.body.idUser ,
    idInformation: req.body.idInformation ,
    descriptionCommentaire: req.body.descriptionCommentaire})
    .then((newcommentairesInformation) => {
      res.status(200).json(newcommentairesInformation);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}*/

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