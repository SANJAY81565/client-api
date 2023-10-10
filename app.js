let express = require('express')
let app = express()
let helmet = require('helmet')
let morgan = require('morgan')
let cors = require('cors')
let bodyParser = require('body-parser')
let ticketRouter = require('./src/ticketRouter')
let ticketRouter = require('./src/userRouter')

app.use(helmet())

app.use(morgan('tiny'))

app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json)


app.use("/", (req, res) =>{
    res.json({message: "Om Sai"})
})

app.use('/v1/ticket', ticketRouter)
app.use('/v1/user', userRouter)


let port = process.env.port || 3001
app.listen(port, () => console.log(`Server is running on ${port}`))