const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()
const port = 3000

let userDB = [];
let items = [];

app.use(bodyParser.json());

passport.use(new BasicStrategy(
    (username, password, done) => {
        const searchResult = userDB.find(user => {
            if (user.username === username){
                if(bcrypt.compareSync(password, user.password)){
                    return true;
                }
            }
            return false;
        })
            console.log(searchResult);
        if (searchResult != undefined) {
            done(null, searchResult);
        } else {
        done(null, false);
        }
    }
));

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
})

app.post('/PostItem', (req, res) => {
    
    const newItem = {
            "ID": req.body.id,
            "title": req.body.title,
            "description": req.body.description,
            "category": req.body.category,
            "location": req.body.location,
            "price": req.body.price,
            "date": req.body.date,
            "deliveryType": req.body.deliveryType,
            "sellerName": req.body.sellerName,
            "sellerEmail": req.body.sellerEmail,
          }
        
        items.push(newItem);
        res.sendStatus(201)
})

app.get('/GetItem/:location?/:category?/:date?', (req, res) => {

})

app.post('/DeleteItem', (req, res) => {

})

app.post('/SignUp', (req, res) => {
    const salt = bcrypt.genSaltSync(6);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    
    const newUser = {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
    }

    userDB.push(newUser);
    res.sendStatus(201);
})

app.get('/LogIn', passport.authenticate('basic', {session: false}), (req, res) => {
    res.sendStatus(200);
})

app.put('/ModifyItem', (req, res) => {

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})