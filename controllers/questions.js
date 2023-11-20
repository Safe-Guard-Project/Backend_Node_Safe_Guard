import Questions from "../models/questions.js"
export function createQuestion(req, res) {
    Questions.create(req.body)
      .then((newquiz) => {
        res.status(201).json(newquiz);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  }
  export function getAllQuestion(req, res) {
    Questions.find({})
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
  export function getOnceQuestions(req, res) {
    Questions.findById({ _id: req.params._id })
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
  export function deleteAllQuestions(req, res) {
    Questions.deleteMany({})
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
  export function deleteOnceQuestions(req, res) {
    Questions.findOneAndDelete({ _id: req.params._id })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
  export function UpdateQuestions(req, res) {
     
    Questions.findByIdAndUpdate(req.params._id, req.body)
          .then((updatedQuiz) => {
              res.status(200).json(updatedQuiz);
          })
          .catch((err) => {
              res.status(400).json({ error: err.message });
          });
  };
  
