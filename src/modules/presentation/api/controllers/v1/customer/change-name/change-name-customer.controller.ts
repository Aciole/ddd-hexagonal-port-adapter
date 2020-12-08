import * as express from 'express';
import { inject } from 'inversify';
import {
	interfaces,
	controller,
	request,
	response,
	httpPatch,
	requestParam,
} from 'inversify-express-utils';
import {
	ApiOperationPatch,
	ApiPath,
	SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import USE_CASE_TYPES from '../../../../../../domain/interfaces/use-case/types';

import { IChangeNameCustomerUseCase } from '../../../../../../domain/interfaces/use-case/change-name-customer';
import { ChangeNameCustomerAdapter } from './change-name-customer.adapter';
import { IChangeNameCustomerCommand } from '../../../../../../domain/interfaces/commands/change-name-customer.command';

@ApiPath({
	name: 'customer',
	path: '/customer',
})
@controller('/customer')
export class ChangeNameCustomerController implements interfaces.Controller {
	constructor(
		@inject(USE_CASE_TYPES.ChangeNameCustomerUseCase)
		private changeNameCustomerUseCase: IChangeNameCustomerUseCase
	) {}

	@ApiOperationPatch({
		description: '',
		summary: '',
		path: '/{id}/name',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
			body: {
				model: 'ChangeName',
				required: true,
			},
		},
		responses: {
			400: {},
			404: {},
			409: {},
			202: {},
		},
	})
	@httpPatch('/:id/name')
	private async changeName(
		@requestParam('id') id: string,
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new ChangeNameCustomerAdapter(response);

		this.changeNameCustomerUseCase.setOutputPort(adapterPort);

		const command: IChangeNameCustomerCommand = { ...request.body, id };

		await this.changeNameCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}
}
