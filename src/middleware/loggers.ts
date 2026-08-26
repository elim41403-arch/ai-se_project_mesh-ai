import type { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method}${req.path}`);
  next();
};

export { logger };