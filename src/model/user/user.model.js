const user = require("./user.schema")

const insertUser = (userObj) =>{
    user(userObj).save()
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
}

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) =>{
        if(!email){
            return false}
        try {
            let gotUserBYEmail = user.findOne({email})
            resolve(gotUserBYEmail)
        }
        catch (error) {
            reject(error)
        }
    })
}
    


module.exports = {insertUser, getUserByEmail}