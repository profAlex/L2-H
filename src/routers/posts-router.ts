import {Request, Response, Router} from 'express';
import {
    createNewPost,
    deletePost,
    findSinglePost,
    getAllPosts,
    updatePost
} from "./router descriptions/post-router-description";

export const postsRouter = Router();

postsRouter.get('/', getAllPosts);
postsRouter.post('/', createNewPost); //auth guarded
postsRouter.get('/:id', findSinglePost);
postsRouter.put('/:id', updatePost); //auth guarded
postsRouter.delete('/:id', deletePost) //auth guarded