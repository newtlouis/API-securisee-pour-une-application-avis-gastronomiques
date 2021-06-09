const express = require('express');
const bodyParser = require('body-parser');
const Thing = require ('./models/Thing');

// Connexion à MongoDb
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://newtlouis:Vacances1@cluster0.hwmp8.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.post('/api/auth/login',(req, res, next) => {
    res.status(201).json({ message: 'Votre requête a bien été reçue !' });
    next();
  });

  app.post('/api/auth/signup',(req, res, next) => {
    res.status(201).json({ message: 'Votre requête a bien été reçue !' });
    next();
  });

app.get('/api/sauces',(req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch (err => res.status(404).json({err}))
});

app.get('/api/sauces/:id',(req,res,next) => {
    Thing.findOne({_id : req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch( err => res.status(404).json({err}));
});

app.put ('/api/sauces/:id',(req,res,next) => {
Thing.updateOne({_id: req.params.id},{...req.body,_id: req.params.id})
.then(() => req.status(200).json({message: 'Sauce modifiée'}))
.catch(err => res.status(400).json({err}));
});

app.delete ('api/sauces/:id', (req,res,next) => {
  Thing.deleteOne({_id: req.params.id})
  .then(() => res.status(200).json({message: 'Sauce suprimée'}))
  .catch(err => res.status(400).json({err}));
});

app.post('/api/sauces', (req,res,next) => {
    console.log(req.body);
    
    const thing = new Thing({
        ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({message: "Utilisateur enregistré"}))
    .catch(err => res.status(400).json({err}));

});

module.exports = app;