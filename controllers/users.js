const User = require ('../models/User.js');


exports.signup = (req,res,next) => {
    bcrypt.hash(req.body.password,10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                paswword: hash
            });
            user.save()
                .then(()=> res.status(201).json({message:'Bienvenue, votre compte à bien été crée.'}))
                .catch(err => res.status(400).json({err}))
        })
        .catch(err => res.status(500).json({err}));
};

exports.login = (req,res,next) => {
    c
};