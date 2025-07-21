import express, { Request, Response, Express } from 'express';
import {BLOGS_PATH, POSTS_PATH, TESTING_PATH} from "./routes/router-pathes";
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {testingRouter} from "./routes/testing-router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    app.use(TESTING_PATH, testingRouter);

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send("All good!");
    });

    return app;

};