import Choix from "../models/choix.js"
export function createChoix(req, res) {
  Choix.create(req.body)
    .then((newquiz) => {
      res.status(201).json(newquiz);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
}
export function getAllChoix(req, res) {
  Choix.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function getOnceChoix(req, res) {
  Choix.findById({ _id: req.params._id })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function deleteAllChoix(req, res) {
  Choix.deleteMany({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function deleteOnceChoix(req, res) {
  Choix.findOneAndDelete({ _id: req.params._id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function UpdateChoix(req, res) {
   
    Choix.findByIdAndUpdate(req.params._id, req.body)
        .then((updatedQuiz) => {
            res.status(200).json(updatedQuiz);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};
