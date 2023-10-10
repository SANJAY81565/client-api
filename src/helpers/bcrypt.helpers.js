const bcrypt = require('bcrypt');
const saltRounds = 10;


let hashPassword = (myPlaintextPassword) =>{
    return new Promise((resolve) =>{
       resolve(bcrypt.hashSync(myPlaintextPassword, saltRounds))
    })
    
}

module.exports = {hashPassword}