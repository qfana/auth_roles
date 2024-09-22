const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
require('dotenv').config();

const PORT = process.env.PORT;

const uri = `mongodb+srv://qfana2123:${process.env.DBPASS}@cluster0.wqusi.mongodb.net/auth_roles?retryWrites=true&w=majority&appName=Cluster0`;

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