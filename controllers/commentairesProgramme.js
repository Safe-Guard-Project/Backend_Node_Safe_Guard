import  CommentairesProgramme  from "../models/commentairesProgramme.js";

export function addComment(req, res) {
 
  CommentairesProgramme.create({
    textComment: req.body.textComment,
    idCoursProgramme: req.body.idCoursProgramme,
  })
    .then((newCommnt) => {
      res.status(200).json(newCommnt);
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
export function getCommentbyIdCours(req, res) {
    
  CommentairesProgramme.find({idCoursProgramme: req.params.idCoursProgramme})
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
export async function getStatistiqueNombreCommentairesParTypeCours (req, res)  {
  try {
    const commentaires = await CommentairesProgramme.find().populate('idCoursProgramme');
    const statistiques = {};

    commentaires.forEach((commentaire) => {
      const typeCours = commentaire.idCoursProgramme ? commentaire.idCoursProgramme.Type : null;

      if (typeCours) {
        if (statistiques[typeCours]) {
          statistiques[typeCours]++;
        } else {
          statistiques[typeCours] = 1;
        }
      }
    });

    const statistiquesArray = Object.entries(statistiques);

  
    statistiquesArray.sort((a, b) => b[1] - a[1]);


    const statistiquesFinale = Object.fromEntries(statistiquesArray);

    return res.status(200).json(statistiquesFinale);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};