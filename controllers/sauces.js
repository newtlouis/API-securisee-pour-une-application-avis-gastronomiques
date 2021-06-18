const Thing = require ('../models/Thing.js');

exports.createSauce = (req,res,next) => {
    console.log(req.body);
    
    const thing = new Thing({
        ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({message: "Utilisateur enregistré"}))
    .catch(err => res.status(400).json({err}));
};

