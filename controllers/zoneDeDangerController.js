import zoneDeDanger from "../models/zoneDeDanger.js";
  

export function createZoneDeDanger(req, res) {
    const { latitudeDeZoneDanger, longitudeDeZoneDanger, idUser } = req.body;
    const newZoneDeDanger = new zoneDeDanger({ latitudeDeZoneDanger, longitudeDeZoneDanger ,idUser});
    newZoneDeDanger.save()
        .then(savedZoneDeDanger => res.json(savedZoneDeDanger))
        .catch(err => res.status(400).json(err));
}
export function getZoneDeDangers(req, res) {
    zoneDeDanger.find()
        .then(
            zoneDeDangers => res.json(zoneDeDangers)
            )
        .catch(err => res.status(400).json(err));
}


export function getZoneDeDangersByCatastropheRadius(req, res) {
    const { latitudeDeCatastrophe, longitudeDeCatastrophe, radius } = req.query;

    if (isNaN(longitudeDeCatastrophe) || isNaN(radius)) {
        return res.status(400).json({ error: 'Invalid input: longitude and radius must be numbers' });
    }

    zoneDeDanger.find({
        latitudeDeZoneDanger: { $gte: latitudeDeCatastrophe - radius, $lte: latitudeDeCatastrophe + radius },
        longitudeDeZoneDanger: { $gte: longitudeDeCatastrophe - radius, $lte: longitudeDeCatastrophe + radius }
    })
    .then(zoneDeDangers => res.json(zoneDeDangers))
    .catch(err => res.status(400).json(err));
}
    

export function updateZoneDeDanger(req, res) {
  zoneDeDanger.findByIdAndUpdate(req.params.id, req.body)
        .then((updatedZoneDeDanger) => {
            res.status(200).json(updatedZoneDeDanger);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
}

export function deleteZoneDeDangerswithlatitudeAndlongitude(req, res) {
    const { latitudeDeZoneDanger, longitudeDeZoneDanger } = req.body;
    zoneDeDanger.deleteOne({
        latitudeDeZoneDanger: latitudeDeZoneDanger,
        longitudeDeZoneDanger: longitudeDeZoneDanger
    })
        .then(() => {
            res.status(200).send();
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
}


export function deleteZoneDeDanger(req, res) {
    zoneDeDanger.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send();
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
}

export function getZoneDeDangerById(req, res) {
    zoneDeDanger.findById(req.params.id)
        .then((zoneDeDanger) => {
            res.status(200).json(zoneDeDanger);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
}