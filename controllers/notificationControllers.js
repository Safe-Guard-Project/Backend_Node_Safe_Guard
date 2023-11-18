

import notification from '../models/notification.js';



export function getAllnotif(req, res) {
    notification.find({})
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }


  export function getOnceNotif(req, res) {
    
    notification.findById({_id : req.params._id})
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
    }

    export function deleteAllNotif(req, res) {
        CommentairesInformation.deleteMany({})
          .then((docs) => {
            res.status(200).json(docs);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }
      
      export function deleteOnceNotif(req, res) {
        commentairesInformation.findOneAndDelete({ _id: req.params._id })
          .then((doc) => {
            res.status(200).json(doc);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }
