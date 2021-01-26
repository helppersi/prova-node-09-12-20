import { Request, Response } from 'express';
import mongoose from 'mongoose';

export default class BaseController {
    public model: mongoose.Model<mongoose.Document<any>>;

    constructor(model: mongoose.Model<mongoose.Document<any>>) {
        this.model = model;
    }
    
    public get = (req: Request, res: Response): void  => {
        this.model.find({}, (err: any, file: any) => {
            if(err) {
                res.status(404).json(err);
            }
            res.status(200).json(file);
        });
    }

    public add = (req: Request, res: Response): void => {
        const newModel: any = new this.model(req.body);

        newModel.save((err: any, file: any) => {
            if(err) {
                res.status(404).json(err);
            }
            res.status(200).json(newModel);
        })
    }

    public getById = (req: Request, res: Response): void => {
        const { id } = req.params;
        this.model.findById(id, (err: any, file: any) => {
            if(err) {
                res.status(404).json({message: 'usuario nao encontrado'});
            }
            res.status(200).json(file);
        });
    }

    public update = (req: Request, res: Response): void => {
        this.model.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {new: true},
            (err: any, file: any) => {
                if(err) {
                    res.status(404).json({message: 'usuario nao encontrado'});
                }
                res.status(200).json(file);
            }
        );
    }
    
    public delete = (req: Request, res: Response): void => {
         this.model.deleteOne({ _id: req.params.id }).then( () =>
            res.status(200).json({ message: 'usuario deletado com sucesso'})
         ).catch((err: any) => res.status(404).json(err));
    }
}