var express = require('express');
var mongoose = require('mongoose');
var BodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/routes'); 

//Conect to DB
mongoose.connect('mongodb://localhost:27017/contactlist');
// On conection
mongoose.connection.on('conected', () => {
    console.log('Conected to MongoDB database @ 27017');
});
// In case of error
mongoose.connection.on('error', (err) => {
    if(err){
        console.log('Error conection to database', + err);
    }
});

// Port number
const port = 5000;

// Midlewares - cors
app.use(cors());

// Midlewares - Body-Parser
app.use(BodyParser.json());

// Static files
app.use(express.static(path.join( __dirname, 'public')));

// Defining the routes
app.use('/api', route);

// Testing server
app.get('/', (req, res) => {
    res.send('Home page');
});

// Binding the server 
app.listen(5000, () => {
    console.log(`Server is running on port: ${port}`)
});