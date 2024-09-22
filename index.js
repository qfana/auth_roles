const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 7788;

const uri = "mongodb+srv://qfana2123:3S2EeLLioWOaLvMs@cluster0.wqusi.mongodb.net/?retryWrites=true&w=majority&ssl=true";

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

async function start() {

  try {
    await mongoose.connect(uri);
    app.listen(PORT, () => console.log(`Server started, port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }

};

start();