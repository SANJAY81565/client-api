require("dotenv").config()
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const ticketRouter = require('./src/ticketRouter');
const userRouter = require('./src/userRouter');
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

const mongoose = require('mongoose');

let connectToMongo = () =>{
try{
    mongoose.connect(process.env.Mongo_url);
    console.log('connected to mongodb');
}catch(err){
    console.log('err in connecting to mongodb');
}
}
connectToMongo()


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/v1/ticket', ticketRouter);
app.use('/v1/user', userRouter);

//app.use("/", (req, res) => {
 //   res.json({ message: "Om Sai" });
 // });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => console.log(`Server is running on ${port}`));
