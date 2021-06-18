const express = require('express');
const router = express.Router();
const Thing = require ('../models/Thing.js');


router.post('/api/auth/login',(req, res, next) => {
    res.status(201).json({ message: 'Votre requête a bien été reçue !' });
    next();
  });

  router.post('/api/auth/signup',(req, res, next) => {
    res.status(201).json({ message: 'Votre requête a bien été reçue !' });
    next();
  });

router.get('/',(req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch (err => res.status(404).json({err}))
});

router.get('/:id',(req,res,next) => {
    Thing.findOne({_id : req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch( err => res.status(404).json({err}));
});

router.put ('/:id',(req,res,next) => {
Thing.updateOne({_id: req.params.id},{...req.body,_id: req.params.id})
.then(() => req.status(200).json({message: 'Sauce modifiée'}))
.catch(err => res.status(400).json({err}));
});

router.delete ('/:id', (req,res,next) => {
  Thing.deleteOne({_id: req.params.id})
  .then(() => res.status(200).json({message: 'Sauce suprimée'}))
  .catch(err => res.status(400).json({err}));
});

const saucesCtrl = require('../controllers/sauces');
router.post('/',saucesCtrl.createSauce);

module.exports = router;