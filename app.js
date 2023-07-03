const express = require('express')
const mainRouter = require('./routes/server')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/blog', mainRouter)





const PORT =  process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})