import express, { Request, Response, Express } from 'express';

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send("All good!");
    });

    return app;

};