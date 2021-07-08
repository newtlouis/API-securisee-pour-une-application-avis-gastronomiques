const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/User.js');
const crypto = require('crypto');



exports.signup = (req,res,next) => {

    // Hashage du mdp
    bcrypt.hash(req.body.password,10)
        .then(hash => {

            // chiffrage de l'email
            const cipher = crypto.createCipher('aes192','a password');
            var encrypted = cipher.update(req.body.email, 'utf-8','hex');
            encrypted += cipher.final('hex');
            console.log(encrypted);

            const user = new User({
                email: encrypted,
                password: hash
            });
            user.save()
                .then(()=> res.status(201).json({message:'Bienvenue, votre compte à bien été crée.'}))
                .catch(err => res.status(400).json({err}))
        })
        .catch(err => res.status(500).json({err}));
};

exports.login = (req,res,next) => {
    const cipher = crypto.createCipher('aes192','a password');
    var encrypted = cipher.update(req.body.email, 'utf-8','hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);

    User.findOne({email : encrypted})
        .then( user => {
            if (!user) {return res.status(401).json({message:'Utilisateur non trouvé'})}
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {return res.status(401).json({message:'mot de passe incorrect'})}
                        else {res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                {userId : user._id},
                                'RANDOM_TOKEN_SECRET',
                                {expiresIn: '24h'}
                            )
                        })}
                    })
                    .catch(err => res.status(500).json({err}))
             }
        }

        )
        .catch(err => res.status(500).json({err}))
};