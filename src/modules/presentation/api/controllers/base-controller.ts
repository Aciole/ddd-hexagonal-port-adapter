import * as express from 'express';

export abstract class BaseController {
	protected abstract executeImpl(
		req: express.Request,
		response: express.Response
	): Promise<void | any>;

	public async execute(
		request: express.Request,
		response: express.Response
	): Promise<void> {
		try {
			await this.executeImpl(request, response);
		} catch (err) {
			console.log(`[BaseController]: Uncaught controller error`);
			console.log(err);
			response.status(500);
		}
	}
}
