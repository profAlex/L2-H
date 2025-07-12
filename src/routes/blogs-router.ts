import {Request, Response, Router} from 'express';

export const blogsRouter = Router();

blogsRouter.get('/', (req: Request, res: Response) => {})
blogsRouter.post('/', (req: Request, res: Response) => {}) //auth guarded
blogsRouter.get('/:id', (req: Request, res: Response) => {})
blogsRouter.put('/:id', (req: Request, res: Response) => {}) //auth guarded
blogsRouter.delete('/:id', (req: Request, res: Response) => {}) //auth guarded


