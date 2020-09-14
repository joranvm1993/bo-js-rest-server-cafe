require('./config/config')

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Rutas 
app.use( require('./routes/index'));


mongoose.connect('mongodb://localhost:27017/cafe', {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) =>{
  if (err) throw err;

  console.log('Base de datos ONLINE');
});

app.listen(3000, () =>{
    console.log('Escuchando puerto: ', process.env.PORT);
})