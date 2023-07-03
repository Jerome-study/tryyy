const Model = require('../models/model')

async function registerUser(req,res,usersAccountCollection) {
    try {
        
        const newUser = await Model.createUser(req)
        const found = await Model.checkUserExist(usersAccountCollection,newUser)

        if (found) {
            res.status(200).render('register', {message: "Email Already Exist"})
        
        } else {
            const result = await Model.insertData(usersAccountCollection,newUser)
            res.status(200).render('success-register', {message: `${newUser.email}, your account is now registered in our system!`})
        }
    } catch (error) {

    }
}

async function loginUser(req,res,usersAccountCollection,router) {
    try {

        
        
        const found = await Model.checkUserExist(usersAccountCollection,req.body)
        
        if (found) {
            const passwordMatch = await Model.checkLoginInfo(usersAccountCollection,req.body)
            if (passwordMatch) {
               
                res.render('success-login', {email: req.body.email})
                
            } else {
                res.status(200).render('login', {message: "Wrong password or email"})
            }
        } else {
            res.status(200).render('login', {message: "Email not exist"})
        }
    } catch (error) {
        console.log(error)
    }

}




module.exports = { registerUser, loginUser }