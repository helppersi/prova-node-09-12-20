import { Request, Response } from 'express';

export default class BaseRouter {
    private controller: any;
    private url: string;

    constructor(controller: any, url: string) {
        this.controller = controller;
        this.url = url;
    }

    //endpoints
    public routes(app: any): void {
        app.use((req: Request, res: Response, next: any) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        //basics endpoints
        app.route(this.url)
            .get(this.controller.get)
            .post(this.controller.add);

        //endpoints with id
        app.route(`${this.url}/:id`)
            .get(this.controller.getById)
            .put(this.controller.update)
            .delete(this.controller.delete);
    }
}