const express = require('express')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/controller')
const connectionString = process.env.MONGODB_URL

const app = express()



mongoDbServer()
async function mongoDbServer () {
    try {
        const client = await MongoClient.connect(connectionString,  { useUnifiedTopology: true})
        const db = client.db('users-account')
        const usersAccountCollection = db.collection('users')
        console.log('Connected to database')
        
       
        
        router.get('/', async (req,res) => {
            res.render('index')
        })

        router.get('/register', async (req,res) => {
            res.render('register', {message : ""})
        })

        router.get('/login', async (req,res) => {
            res.render('login', {message : null})
        })

        router.post('/register', async (req,res) => {
            registerUser(req,res,usersAccountCollection, router)
        })

        router.post('/login', async (req,res) => {
            loginUser(req,res,usersAccountCollection, router)
        })



    } catch (error) {
        console.log(error)
    }
    
}








module.exports = router