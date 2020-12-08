import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as swagger from 'swagger-express-ts';
import 'reflect-metadata';
import './modules/presentation/api/controllers/v1/customer/customer.routes';

import { InversifyExpressServer } from 'inversify-express-utils';

import container from './config/ioc/ioc-config';

let server = new InversifyExpressServer(container);

server.setConfig((app) => {
	app.use(
		bodyParser.urlencoded({
			extended: true,
		})
	);
	app.use(bodyParser.json());
	app.use(
		'/api-docs/swagger',
		express.static('src/modules/Infrastructure/http/swagger')
	);
	app.use(
		'/api-docs/swagger/assets',
		express.static('node_modules/swagger-ui-dist')
	);

	app.use(
		swagger.express({
			definition: {
				info: {
					title: 'My api',
					version: '1.0',
				},
				externalDocs: {
					url: 'My url',
				},
			},
		})
	);
});

server.setErrorConfig((app: any) => {
	app.use(
		(
			err: Error,
			request: express.Request,
			response: express.Response,
			next: express.NextFunction
		) => {
			console.error(err.stack);
			response.status(500).send('Something broke!');
		}
	);
});

let app = server.build();
app.listen(3000);

console.log('Server started on port 3000 :)');
