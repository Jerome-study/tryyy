const bcrypt = require('bcrypt')


function findData(usersAccountCollection,user) {
    return new Promise(async (resolve,reject) => {
        const data = await usersAccountCollection.find().toArray()
        const found = await data.find(d => d.email === user.email)
        resolve(found)
    })
}


function checkUserExist(usersAccountCollection,user) {
    return new Promise(async (resolve,reject) => {
        const data = await usersAccountCollection.find().toArray()
        const found = await data.some(d => d.email === user.email)
        resolve(found)
    })
}

function insertData(usersAccountCollection,user) {
    return new Promise((resolve,reject) => {
        const result =  usersAccountCollection.insertOne({username:user.username, email: user.email, password: user.password})
        resolve(result)
    })
}



function createUser(req) {
    return new Promise(async (resolve,reject) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }
        resolve(newUser)
    })
}


function checkLoginInfo(usersAccountCollection,user) {
    return new Promise(async (resolve,reject) => {
        const result =  await usersAccountCollection.find({email: user.email}).toArray()
        if (await bcrypt.compare(user.password, result[0].password) || user.password === result[0].password) {
            resolve(true)
        } else {
            resolve(false)
        }
    })
}


module.exports = { findData, checkUserExist, insertData, createUser, checkLoginInfo }