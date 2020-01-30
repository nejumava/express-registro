var mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

// definimos el schema
var schema = mongoose.Schema({
    name: String,
    email: String
});
  
// definimos el modelo
var Register = mongoose.model("Register", schema);

app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', (req, res) => {
    Register.find({}, (err, registers) => {
        res.render('index', { registers: registers });
    });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {    
    Register.create({ name: req.body.name, email: req.body.email }, function(err){
        if (err) return console.error(err);
        res.redirect('/');
    }); 
});

app.listen(3000, () => console.log('Listening on port 3000!'));