require('dotenv').config();
const db = require('./db');
const express = require('express');
const cors = require('cors');
const router = require('./src/routes/index');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./src/middlewares/Error.middleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use('/api', router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await db.authenticate();
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();