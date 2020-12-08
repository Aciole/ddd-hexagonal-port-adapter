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
import { IVerifyEmailCustomerUseCase } from '../../../../../../domain/interfaces/use-case/verify-email.customer';
import { VerifyEmailCustomerAdapter } from './verify-email-customer.adpter';
import { IVerifyEmailCustomerCommand } from '../../../../../../domain/interfaces/commands/verify-email-customer.command';

@ApiPath({
	name: 'customer',
	path: '/customer',
})
@controller('/customer')
export class VerifyEmailCustomerController implements interfaces.Controller {
	/**
	 *
	 */
	constructor(
		@inject(USE_CASE_TYPES.VerifyEmailCustomerUseCase)
		private verifyEmailCustomerUseCase: IVerifyEmailCustomerUseCase
	) {}

	@ApiOperationPatch({
		description: '',
		summary: '',
		path: '/{id}/verify-email',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
			body: {
				model: 'VerifyEmail',
				required: true,
			},
		},
		responses: {
			400: {},
			404: {},
			202: {},
			204: {},
		},
	})
	@httpPatch('/:id/verify-email')
	private async verifyEmail(
		@requestParam('id') id: string,
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new VerifyEmailCustomerAdapter(response);

		this.verifyEmailCustomerUseCase.setOutputPort(adapterPort);
		const command: IVerifyEmailCustomerCommand = { ...request.body, id };

		await this.verifyEmailCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}
}
