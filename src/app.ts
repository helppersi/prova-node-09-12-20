import cors = require('cors');
import mongoose = require('mongoose');
import dotenv = require('dotenv');
import express = require('express');
import UserRouter from './Routes/UserRouter';

dotenv.config();
const { DB_CONNECTION } = process.env;

class App {
  public serverExpress: express.Application;

  public constructor() {
    this.serverExpress = express();
    this.midlewares();
    this.routes();
    this.database();
  }

  private database(): void {
    mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  private midlewares(): void {
    this.serverExpress.use(cors());
    this.serverExpress.use(express.json());
  }

  private routes(): void {
    this.serverExpress.use(UserRouter);
    this.serverExpress.get('/', (req, res) => {
      res.send('Prova Backend Helpper');
    });
  }
}

export default new App().serverExpress;
