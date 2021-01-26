import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//Routes
import UserRoutes from './routes/userRoutes';

class App {
    public app: express.Application;

    //application routes
    private userRoutes: UserRoutes;

    private mongoUrl;

    constructor() {
        this.app = express();

        this.userRoutes = new UserRoutes();
        this.mongoUrl = 'mongodb://localhost/prova-node';

        this.configApp();
        this.configRoutes();
        this.configMongo();
    }

    private configApp(): void {
        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // parse application/json
        this.app.use(bodyParser.json());
    }

    private configRoutes(): void {  
        this.userRoutes.routes(this.app);
        
        this.app.get('/', (req,res) => {
            res.send('<h1>Prova Backend Helpper<h1>');//write a response
        });
    }

    private configMongo(): void {
        mongoose.connect(this.mongoUrl, { 
            useNewUrlParser:true,  
            useUnifiedTopology: true, 
            useFindAndModify: false
        })
        .then(() => {
            console.log('DB is connected');
        }, (err) => { console.log(`Error in connect DB: ${err}`)});
    }
}

export default new App().app;