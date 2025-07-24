import {Request, Response, Router} from 'express';
import {dataRepository} from "../repository/blogger-repository";
import {HttpStatus} from "../core/http-statuses";
import {
    createNewBlog,
    deleteBlog,
    findSingleBlog,
    getAllBlogs,
    updateBlog
} from "./router descriptions/blog-router-description";
import {blogInputModelValidation} from "../validation/BlogInputModel-validation-middleware";

export const blogsRouter = Router();

blogsRouter.get('/', getAllBlogs);
blogsRouter.post('/', blogInputModelValidation, createNewBlog); //auth guarded
blogsRouter.get('/:id', findSingleBlog);
blogsRouter.put('/:id', blogInputModelValidation, updateBlog); //auth guarded
blogsRouter.delete('/:id', deleteBlog); //auth guarded



