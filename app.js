const express = require('express');
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8000;

app.use(bodyParser.urlencoded({extented:false}));

mongoose.connect('mongodb://127.0.0.1/Dance-Web-Forms', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection successful');
}).catch((error) => {
    console.log('something wrong', error);
});

var registrationSchema = new mongoose.Schema({
    name:{
        type: String
    },
    age:{
        type: Number
    },
    parentname:{
        type: String
    },
    phoneNo:{
        type: Number
    },
    address:{
        type: String
    },
    city:{
        type: String
    },
    state:{
        type: String
    },
    postalcode:{
        type: Number
    },
    country:{
        type: String
    },
    camp:{
        type: String
    }
});

var contactSchema = new mongoose.Schema({
    name:{
        type: String
    },
    phone:{
        type: Number
    },
    email:{
        type: String
    },
    address:{
        type: String
    },
    desc:{
        type: String
    }
  });



var Contact = mongoose.model('Contact', contactSchema);
var RegistrationForm = mongoose.model('RegistrationForm', registrationSchema);

app.use('/static', express.static('static'));

app.set('views engine', 'pug');

app.get('/', (req, res) =>{
    const params = { }
    res.status(200).render('home.pug', params);
});

app.get('/about', (req, res)=>{
    const params = { }
    res.status(200).render('about.pug', params);
});

app.get('/summercamp', (req, res)=>{
    const params = { }
    res.status(200).render('camp.pug', params);
});

app.get('/classinfo', (req, res)=>{
    const params = { }
    res.status(200).render('classinfo.pug', params);
});


app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
});

app.post('/contact', async(req, res) =>{
    var myData = new Contact(req.body);
    await myData.save().then(()=>{
    res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });
});

app.post('/summercamp', async(req, res) =>{
    var myData = new RegistrationForm(req.body);
    await myData.save().then(()=>{
    res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });
});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

