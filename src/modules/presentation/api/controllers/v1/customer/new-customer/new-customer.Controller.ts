import * as express from 'express';
import { inject } from 'inversify';
import {
	interfaces,
	controller,
	httpPost,
	request,
	response,
} from 'inversify-express-utils';
import { ApiOperationPost, ApiPath } from 'swagger-express-ts';
import USE_CASE_TYPES from '../../../../../../domain/interfaces/use-case/types';
import { NewCustomerAdapter } from './new-customer.adpter';
import { INewCustomerUseCase } from '../../../../../../domain/interfaces/use-case/new-customer';
import { INewCustomerCommand } from '../../../../../../domain/interfaces/commands/new-customer.command';

@ApiPath({
	name: 'customer',
	path: '/customer',
})
@controller('/customer')
export class NewCustomerController implements interfaces.Controller {
	constructor(
		@inject(USE_CASE_TYPES.NewCustomerUseCase)
		private newCustomerUseCase: INewCustomerUseCase
	) {}

	@ApiOperationPost({
		description: 'Register new Customer',
		summary: 'Register new Customer',
		parameters: {
			body: {
				model: 'CustomerRegister',
				required: true,
			},
		},
		responses: {
			201: { model: 'Customer' },
			400: { description: 'errors' },
			409: { description: 'errors' },
			500: {},
		},
	})
	@httpPost('/')
	private async create(
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new NewCustomerAdapter(response);

		this.newCustomerUseCase.setOutputPort(adapterPort);
		const command: INewCustomerCommand = { ...request.body };

		await this.newCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}
}
