const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs')
const app = express()
const port = 3000

let useDB = [];

app.use(bodyParser.json());

passport.use(new BasicStrategy(
    (username, password, done) => {
        const searchResult = userDB.find(user => ((username === user.username) && (password === user.password)))
        if(searchResult != undefined){
            done(null, searchResult);
        } else {
            done(null, false);
        }
    }));

const items = [
    {name: 'Sohva', title: 'huonekalu', description: 'divaanisohva'}
];

const users = [
    {}
];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/GetItems', (req, res) => {
    res.json(items);
    if (items == "") {
        res.sendStatus(404);
    }
    
})

app.post('/PostItem', (req, res) => {
    items.push({ name: req.body.name, 
        title: req.body.title, 
        description: req.body.description })
    res.sendStatus(201);
})

app.get('/GetItem/:location?/:category?/:date?', (req, res) => {

})

app.post('/DeleteItem', (req, res) => {

})

app.post('/SignUp', (req, res) => {
    const
})

app.post('/LogIn', (req, res) => {

})

app.put('/ModifyItem', (req, res) => {

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})