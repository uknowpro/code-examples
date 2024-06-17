import { Context } from 'koa';
import { config } from './config';
import { transports, format } from 'winston';

const logger = (winston: any): any => {
  winston.configure({
    level: config.debugLogging ? 'debug' : 'info',
    transports: [
      new transports.Console({
        format: format.simple(),
      }),
    ],
  });
  return async (ctx: Context, next: () => Promise<any>): Promise<void> => {
    const start = new Date().getTime();
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
    const ms = new Date().getTime() - start;
    let logLevel: string;
    if (ctx.status >= 500) {
      logLevel = 'error';
    } else if (ctx.status >= 400) {
      logLevel = 'warn';
    } else {
      logLevel = 'info';
    }
    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;
    winston.log(logLevel, msg);
  };
};

export { logger };
