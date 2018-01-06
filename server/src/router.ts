import * as KoaRouter from 'koa-router';

import * as HelloController from './api/controllers/HelloController';

export default class ApiRouter extends KoaRouter {
  public constructor() {
    super({ prefix: '/api' });
    this.setupRoutes();
  }

  /**
   * Initialize routes
   */
  private readonly setupRoutes = (): void => {
    this.get('/hellos', HelloController.list);
  }
}
