const bcrypt = require('bcrypt');
const saltRounds = 10;


let hashPassword = (myPlaintextPassword) =>{
    return new Promise((resolve) =>{
       resolve(bcrypt.hashSync(myPlaintextPassword, saltRounds))
    })
    
}

let comparePass = (plainPass, passFromDb) =>{
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, passFromDb, function(err, result) {
            if (err) reject(err)
            resolve(result);
        });
    })
}

module.exports = {hashPassword, comparePass}