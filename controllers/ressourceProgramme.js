
// import RessourceProgramme from "../models/ressourceProgramme.js";

// export function addRessource(req, res) {
//   const Image = req.file.mimetype.startsWith("image/");
//   const Video = req.file.mimetype.startsWith("video/");

//   if (Image) {
//     RessourceProgramme.create({
//       descripaddRessourcetion: req.body.description,
//       idProgramme: req.body.idProgramme,
//       image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
//     })
//       .then((newRess) => {
//         res.status(200).json(newRess);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err });
//       });
//   } else if (Video) {
//     RessourceProgramme.create({
//       description: req.body.description,
//       idProgramme: req.body.idProgramme,
//       video: `${req.protocol}://${req.get("host")}/video/${req.file.filename}`,
//     })
//       .then((newRess) => {
//         res.status(200).json(newRess);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err });
//       });
//   } else {
//     res.status(400).json({ error: "Type de fichier non pris en charge." });
//   }
// }

// export function getAll(req, res) {
//   RessourceProgramme.find({})
//     .then((docs) => {
//       res.status(200).json(docs);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// }

// export function getOnceRes(req, res) {
//   RessourceProgramme.findById({ _id: req.params._id })
//     .then((docs) => {
//       res.status(200).json(docs);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// }

// export function Update(req, res) {
   
//    RessourceProgramme.findByIdAndUpdate(req.params._id, req.body)
//         .then((updatedRessource) => {
//             res.status(200).json(updatedRessource);
//         })
//         .catch((err) => {
//             res.status(400).json({ error: err.message });
//         });
// };


// export function deleteOnceRess(req, res) {
//   RessourceProgramme.findOneAndDelete({ _id: req.params._id })
//     .then((doc) => {
//       res.status(200).json(doc);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// }
// export function deleteAll(req, res) {
//   RessourceProgramme.deleteMany({})
//     .then((docs) => {
//       res.status(200).json(docs);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// }
