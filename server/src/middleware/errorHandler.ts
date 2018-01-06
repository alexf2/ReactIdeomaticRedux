import { IRouterContext } from 'koa-router';

import { IContextualLogger } from '../contextualLogger';
import ctxLogger from '../logger';

type ResponseStatus = 'ok' | 'error';

/**
 * Simple HTTP response
 */
interface ISimpleResponse {
  readonly status: ResponseStatus;
  readonly message?: string;
}

/**
 * ApplicationError, understood by error handler
 */
interface IApplicationError {
  readonly status: number;
  readonly body: ISimpleResponse;
}

/**
 * Handle error response from database operation.
 *
 * @param logger Logger to bind to scope
 * @return Function expecting router context and returning function expecting an error
 */
/* tslint:disable-next-line:no-any */
const handleError: (logger?: IContextualLogger) => (ctx: IRouterContext) => (err: IApplicationError | any) => void =
  (logger) =>
    (ctx) =>
      (err) => {
        // ApplicationError has these but is just interface so cannot do instanceof
        if (err && err.status && err.body) {
          ctx.status = err.status;
          ctx.body = err.body;
        } else {
          logger && logger.error(ctx, 'Internal server error', err);
          const payload: ISimpleResponse = {
            status: 'error',
            message: err && err.message ? err.message : null
          };
          ctx.status = 500;
          ctx.body = payload;
        }
      };

/* tslint:disable-next-line:no-any */
const errorHandler: (ctx: IRouterContext) => (err: IApplicationError | any) => void = handleError(ctxLogger);

export default errorHandler;

export {
  IApplicationError,
  ISimpleResponse,
  ResponseStatus,

  errorHandler
};
