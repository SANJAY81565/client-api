let express = require('express')
let router = express.Router()
const {insertUser} = require("./model/user/user.model")
const {hashPassword} = require("./helpers/bcrypt.helpers")

router.get('/', (req, res, next) =>{
    //res.send('this is user router')
    next()
})

router.post("/", async (req, res) =>{
    const {name, company, address, phone, email, password} = req.body
    try {
        const hashedPass = await hashPassword(password)
        const newUserObj = {
            name, company, address, phone, email, password: hashedPass
        }
        let result = await insertUser(newUserObj)
        res.json(result)
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router