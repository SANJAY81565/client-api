const user = require("./user.schema")

const insertUser = (userObj) =>{
    user(userObj).save()
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
}

module.exports = {insertUser}