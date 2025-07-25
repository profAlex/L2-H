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
import {inputErrorManagementMiddleware} from "../validation/error-management-validation-middleware";
import {inputIdValidation} from "../validation/id-input-validation-middleware";

export const blogsRouter = Router();

blogsRouter.get('/', getAllBlogs);
// где обрабатывать массив errorMessages (который в функции inputErrorManagementMiddleware), где его органично выводить если он не пустой?
blogsRouter.post('/', blogInputModelValidation, inputErrorManagementMiddleware, createNewBlog); //auth guarded
blogsRouter.get('/:id', inputIdValidation, inputErrorManagementMiddleware, findSingleBlog);
// inputErrorManagementMiddleware два раза или один? проверить!
blogsRouter.put('/:id', inputIdValidation, inputErrorManagementMiddleware, blogInputModelValidation, inputErrorManagementMiddleware, updateBlog); //auth guarded
blogsRouter.delete('/:id', inputIdValidation, inputErrorManagementMiddleware, deleteBlog); //auth guarded



