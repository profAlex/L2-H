import {Request, Response, Router} from 'express';
import {
    createNewPost,
    deletePost,
    findSinglePost,
    getAllPosts,
    updatePost
} from "./router descriptions/post-router-description";
import {postInputModelValidation} from "../validation/PostInputModel-validation-middleware";

export const postsRouter = Router();

postsRouter.get('/', getAllPosts);
postsRouter.post('/', postInputModelValidation, createNewPost); //auth guarded
postsRouter.get('/:id', findSinglePost);
postsRouter.put('/:id', postInputModelValidation, updatePost); //auth guarded
postsRouter.delete('/:id', deletePost) //auth guarded