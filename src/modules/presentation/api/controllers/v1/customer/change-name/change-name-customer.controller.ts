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
import USE_CASE_TYPES from '../../../../../../domain/use-case/v1/types';

import { IChangeNameCustomerUseCase } from '../../../../../../domain/use-case/v1/change-name/change-name-customer.usecase';
import { IChangeNameCustomerCommand } from '../../../../../../domain/use-case/v1/change-name/change-name-customer.command';
import { ChangeNameCustomerAdapter } from './change-name-customer.adapter';

@ApiPath({
	name: 'customer',
	path: '/v1/customer',
})
@controller('/v1/customer')
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

		await this.changeNameCustomerUseCase.execute(`${Math.random()}`, command);

		return adapterPort.response;
	}
}
