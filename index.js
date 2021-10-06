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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/GetItems', (req, res) => {

})

app.post('/PostItem', (req, res) => {
    
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