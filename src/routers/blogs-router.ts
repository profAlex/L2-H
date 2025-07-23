import {Request, Response, Router} from 'express';
import {dataRepository} from "../repository/blogger-repository";
import {HttpStatus} from "../core/http-statuses";
import {createNewBlog, findSingleBlog, getAllBlogs} from "./router descriptions/blog-router-description";

export const blogsRouter = Router();

blogsRouter.get('/', getAllBlogs);

blogsRouter.post('/', createNewBlog); //auth guarded

blogsRouter.get('/:id', findSingleBlog);

blogsRouter.put('/:id', (req: Request, res: Response) => {}); //auth guarded

blogsRouter.delete('/:id', (req: Request, res: Response) => {}); //auth guarded


