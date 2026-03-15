import { Request, Response, NextFunction } from 'express';
import { ApiUsage } from '../models/ApiUsage';

export const requestLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const start = Date.now();

  res.on('finish', async () => {
    const duration = Date.now() - start;
    
    if (req.path.startsWith('/api/')) {
      try {
        const userId = (req as any).user?._id;

        await ApiUsage.create({
          userId: userId || null,
          endpoint: req.path,
          method: req.method,
          statusCode: res.statusCode,
          responseTime: duration,
          ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
          userAgent: req.get('user-agent'),
        });
      } catch (error) {
        console.error('Failed to log API usage:', error);
      }
    }
  });

  next();
};
