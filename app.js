const express = require('express');
const bodyParser = require('body-parser');
const Thing = require ('./models/Thing.js');

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
// Import routes
const saucesRoutes = require('./routes/sauces');

app.use('/api/sauces', saucesRoutes); 

app.get('/api/loulou', (req,res,next) => {
  res.send('louis');
});

app.post('/api/loulou',(req,res,next) => {
console.log(req.body)
});


module.exports = app;