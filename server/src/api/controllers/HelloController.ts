import { IRouterContext } from 'koa-router';

import ctxLogger from '../../logger';
import errorHandler from '../../middleware/errorHandler';


/**
 * List all greetings
 *
 * @param ctx
 */
/* tslint:disable-next-line:no-any */
const list: (ctx: IRouterContext) => Promise<any> =
  async(ctx) => {
    ctxLogger.info(ctx, 'Someone needs a greeting');
    ctx.body = 'Hello';
  };

export { list };
