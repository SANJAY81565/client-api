let express = require('express')
let router = express.Router()
const {insertUser, getUserByEmail} = require("./model/user/user.model")
const {hashPassword, comparePass} = require("./helpers/bcrypt.helpers")
const {createAccessToken, createRefreshToken} = require("./helpers/jwt.helpers")

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


router.post("/login", async (req, res) => {
    console.log(req.body);

    const {email, password} = req.body

    if(!email || !password){
       return res.json({status : "error", message : "invalid submission"})
    }

    let gotUser = await getUserByEmail(email)
    console.log(gotUser);

    let passFromDb = gotUser && gotUser.id ? gotUser.password : null
    if (!passFromDb) {
        res.json({status: "error", message : "invalid email or password" })
    }

    let result = await comparePass(password, passFromDb)

    if (!result) {
        res.json({status: "error", message : "invalid email or password" })
    }
    console.log(result);

    const accessJwt = await createAccessToken(gotUser.email)
    const refreshJwt = await createRefreshToken(gotUser.email)


    res.json({status : "success", message : "valid submission", accessJwt, refreshJwt})
})
module.exports = router