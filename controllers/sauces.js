const Thing = require ('../models/Thing.js');

exports.createSauce = (req,res,next) => {
    console.log(req.body);

    const thingObject = JSON.parse(req.body.thing)

    delete thingObject._id;
    
    const thing = new Thing({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
    .then(() => res.status(201).json({message: "Sauce enregistrée"}))
    .catch(err => res.status(400).json({err}));
};

exports.showAllSauces = (req,res,next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch (err => res.status(404).json({err}))
};

exports.deleteSauce = (req,res,next) => {
    Thing.deleteOne({_id: req.params.id})
  .then(() => res.status(200).json({message: 'Sauce suprimée'}))
  .catch(err => res.status(400).json({err}));
};

exports.updateSauce = (req,res,next) => {
    Thing.updateOne({_id: req.params.id},{...req.body,_id: req.params.id})
.then(() => res.status(200).json({message: 'Sauce modifiée'}))
.catch(err => res.status(400).json({err}));
};

exports.showSauce = (req,res,next) => {
    Thing.findOne({_id : req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch( err => res.status(404).json({err}));
}

