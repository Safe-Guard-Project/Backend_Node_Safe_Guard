
getAllnotif, getOnceNotif, deleteOnceNotif, deleteAllNotif

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
