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
export function getFavWithCours(req, res) {
  Favorie.find({})
    .populate('idCoursProgramme')
    .exec()
    .then((courss) => {
      res.status(200).json(courss);
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
export async function getStatistiqueNombreFavorisParTypeCours(req, res) {
  try {
    const favoris = await Favorie.find().populate('idCoursProgramme');
    const statistiques = {};

    favoris.forEach((favori) => {
      const typeCours = favori.idCoursProgramme ? favori.idCoursProgramme.Type : null;

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
    const troisPlusFavoris = statistiquesArray.slice(0, 3);
    const statistiquesFinale = Object.fromEntries(troisPlusFavoris);

    return res.status(200).json(statistiquesFinale);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
