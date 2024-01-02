import CoursProgramme from '../models/coursProgramme.js';
import cloudinary from '../middlewares/cloudinary.js';

export async function addRessource(req, res) {
  console.log('Request Body:', req.body);
  console.log('Type:', req.body.Type);
  console.log('Description:', req.body.description);
  console.log('Image:', req.body.image);
  const cloudinaryy = await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' });
 CoursProgramme.create({
   Type : req.body.Type ,
   description: req.body.description,
   image: cloudinaryy.secure_url, 
 })
   .then((newProg) => {
     res.status(200).json(newProg);
   })
   .catch((err) => {
     res.status(500).json({ error: err });
   });
}


export function getAll(req, res) {
    CoursProgramme.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getOnceByType (req, res) {
  CoursProgramme.find({ Type: req.params.Type })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
}

export async function Update(req, res) {
  const { _id } = req.params;
  const updatedCoursData = req.body;

  try {
    if (req.file) {
    
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' });
      updatedCoursData.image = cloudinaryResponse.secure_url;
    }

    const updatedCours = await CoursProgramme.findByIdAndUpdate(_id, updatedCoursData, { new: true });

    res.status(200).json(updatedCours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Erreur lors de la mise Ã  jour de la ressource.' });
  }
}


export function deleteOnceRess(req, res) {
    CoursProgramme.findOneAndDelete({ _id: req.params._id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function deleteAll(req, res) {
    CoursProgramme.deleteMany({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function getOneCours(req,res){
  CoursProgramme
  .findById({_id : req.params._id})
  .then(docs => {
      res.status(200).json(docs);
  })
  .catch(err => {
      res.status(500).json({error:err})
  })
}
