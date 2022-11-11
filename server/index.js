const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require("cors");

// доступ со всех api
app.use(cors());

// перевод req.body в json
app.use(express.json());

// роутинги
app.use('/auth',require('./routes/authRouter'))
app.use('/users',require('./routes/userRouter'))
app.use('/notes',require('./routes/noteRouter'))


const start = async () => {
  try {
    // connectDB
    await mongoose.connect(
      "mongodb+srv://admin:rrr123@cluster0.gin8uzz.mongodb.net/notesProject?retryWrites=true&w=majority"
    );
    app.listen(3501, () => console.log(`Server is listening port ${3501}...`));
  } catch (error) {
    console.log(error);
  }
};

start();