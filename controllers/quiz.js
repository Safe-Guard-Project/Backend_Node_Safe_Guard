import Quiz from "../models/quiz.js";
export function createQuiz(req, res) {
  Quiz.create(req.body)
    .then((newquiz) => {
      res.status(201).json(newquiz);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
}
export function getAllQuiz(req, res) {
  Quiz.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function getOnceQuiz(req, res) {
  Quiz.findById({ _id: req.params._id })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function deleteAllQuiz(req, res) {
  Quiz.deleteMany({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function deleteOnceQuiz(req, res) {
  Quiz.findOneAndDelete({ _id: req.params._id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function UpdateQ(req, res) {
   
    Quiz.findByIdAndUpdate(req.params._id, req.body)
        .then((updatedQuiz) => {
            res.status(200).json(updatedQuiz);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};
