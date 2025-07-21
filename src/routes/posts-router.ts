import {Request, Response, Router} from 'express';

export const postsRouter = Router();

postsRouter.get('/', (req: Request, res: Response) => {})
postsRouter.post('/', (req: Request, res: Response) => {}) //auth guarded
postsRouter.get('/:id', (req: Request, res: Response) => {})
postsRouter.put('/:id', (req: Request, res: Response) => {}) //auth guarded
postsRouter.delete('/:id', (req: Request, res: Response) => {}) //auth guarded