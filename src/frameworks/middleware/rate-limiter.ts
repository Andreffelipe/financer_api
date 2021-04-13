import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import { configApp } from '../../config/config';

const redisClient = redis.createClient({
  host: configApp.REDIS_HOST,
  port: Number(configApp.REDIS_PORT),
  password: configApp.REDIS_PASS
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 5
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void | Response> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    return response.status(429).json('Too many request');
  }

}
