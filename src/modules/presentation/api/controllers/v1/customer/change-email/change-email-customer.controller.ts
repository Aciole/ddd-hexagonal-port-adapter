import * as express from 'express';
import { inject } from 'inversify';
import {
	interfaces,
	controller,
	httpPost,
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

import { IChangeEmailCustomerUseCase } from '../../../../../../domain/interfaces/use-case/change-email-customer';
import { ChangeEmailCustomerAdapter } from './change-email-customer.adapter';
import { IChangeEmailCustomerCommand } from '../../../../../../domain/interfaces/commands/change-email-customer.command';

@ApiPath({
	name: 'customer',
	path: '/customer',
})
@controller('/customer')
export class ChangeEmailCustomerController implements interfaces.Controller {
	constructor(
		@inject(USE_CASE_TYPES.ChangeEmailCustomerUseCase)
		private changeEmailCustomerUseCase: IChangeEmailCustomerUseCase
	) {}

	@ApiOperationPatch({
		description: '',
		summary: '',
		path: '/{id}/email',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
			body: {
				model: 'ChangeEmail',
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
	@httpPatch('/:id/email')
	private async changeEmail(
		@requestParam('id') id: string,
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new ChangeEmailCustomerAdapter(response);

		this.changeEmailCustomerUseCase.setOutputPort(adapterPort);
		const command: IChangeEmailCustomerCommand = { ...request.body, id };

		await this.changeEmailCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}
}
