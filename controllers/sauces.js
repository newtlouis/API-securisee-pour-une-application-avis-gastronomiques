const Thing = require ('../models/Thing.js');
const fs = require('fs');

exports.createSauce = (req,res,next) => {
    console.log(req.body);
    console.log(req.body.sauce);
    console.log(req.body.thing);

    const thingObject = JSON.parse(req.body.sauce)
    console.log(thingObject);


    delete thingObject._id;
    
    const thing = new Thing({
        ...thingObject,
        likes :'0',
        dislikes:'0',
        usersLiked:'0',
        usersDisliked:'0',
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
    Thing.findOne({_id: req.params.id})
        .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1]; 
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Sauce suprimée'}))
                .catch(err => res.status(400).json({err}));
            } )
        })
        .catch(err => res.status(500).json({err}));
        

};

exports.updateSauce = (req,res,next) => {
    const thingObject = req.file ? 
        {...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } 
        : {...req.body}
    Thing.updateOne({_id: req.params.id},{...thingObject,_id: req.params.id})
.then(() => res.status(200).json({message: 'Sauce modifiée'}))
.catch(err => res.status(400).json({err}));
};

exports.showSauce = (req,res,next) => {
    Thing.findOne({_id : req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch( err => res.status(404).json({err}));
}

