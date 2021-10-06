const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/GetItems', (req, res) => {

})

app.get('/GetItem/:location?/:category?/:date?', (req, res) => {

})


app.post('/SignUp', (req, res) => {

})

app.post('/LogIn', (req, res) => {

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})