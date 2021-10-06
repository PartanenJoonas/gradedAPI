const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy
const bcrypt = require('bcryptjs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()
const port = 3000

let userDB = [];
let items = [];

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000)

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
            console.log("asd")
        } else {
        done(null, false);
        }
    }
));

app.get('/GetItems', (req, res) => {
    res.json(items);
    
})

app.post('/PostItem', upload.array('images', 4), (req, res, next) => {

    
    const newItem = {
            "ID": req.body.id,
            "title": req.body.title,
            "description": req.body.description,
            "category": req.body.category,
            "location": req.body.location,
            "images": 
                {
                  "image1": req.files[0],
                  "image3": req.files[1],
                  "image2": req.files[2],
                  "image4": req.files[3]
                },
            "price": req.body.price,
            "date": req.body.date,
            "deliveryType": req.body.deliveryType,
            "sellerName": req.body.sellerName,
            "sellerEmail": req.body.sellerEmail,
          }
        
        items.push(newItem);
        res.sendStatus(201)
})

app.get('/GetItemByLocation/:location', (req, res) => {
    
    if(req.params.location != undefined){
        const found_items = items.filter(e => e.location === req.params.location)
        console.log(found_items)
        res.send(found_items)
    }else {
        res.sendStatus(404)
    }
})

app.get('/GetItemByCategory/:category', (req, res) => {
    
    if(req.params.category != undefined){
        const found_items = items.filter(e => e.category === req.params.category)
        console.log(found_items)
        res.send(found_items)
    }else {
        res.sendStatus(404)
    }
})

app.get('/GetItemByDate/:date', (req, res) => {
    
    if(req.params.date != undefined){
        const found_items = items.filter(e => e.date === req.params.date)
        console.log(found_items)
        res.send(found_items)
    }else {
        res.sendStatus(404)
    }
})

app.put('/DeleteItem', (req, res) => {
    /*itemIndex = items.findIndex(d => d.id === req.body.id);
    if (req.body.id != undefined)
    { 
        //res.json(items)
        items.splice[itemIndex]
    }
    else
    { 
        res.sendStatus(404);
    }*/
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
    //Doesnt work
}) 

app.put('/ModifyItem', (req, res) => {
    /*items.findIndex(d => d.id === req.body.id);
    if(items.index === undefined) {
        res.sendStatus(404);
    } else {
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
    }*/
})


app.listen(app.get('port'), () => {
  console.log(`running on port `, app.get('port'))
})