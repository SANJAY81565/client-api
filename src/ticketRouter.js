let express = require('express')
let router = express.Router()

router.all('/', (req, res) =>{
    res.json({message :'this is ticket router'})
})

module.exports = router