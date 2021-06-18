const express = require('express');
const router = express.Router();
const Thing = require ('../models/Thing.js');



const saucesCtrl = require('../controllers/sauces');
router.post('/',saucesCtrl.createSauce);
router.get('/', saucesCtrl.showAllSauces);
router.delete('/:id', saucesCtrl.deleteSauce);
router.put('/:id', saucesCtrl.updateSauce);
router.get('/:id', saucesCtrl.showSauce);


router.post('/api/auth/login',(req, res, next) => {
  res.status(201).json({ message: 'Votre requête a bien été reçue !' });
  next();
});

router.post('/api/auth/signup',(req, res, next) => {
  res.status(201).json({ message: 'Votre requête a bien été reçue !' });
  next();
});

module.exports = router;