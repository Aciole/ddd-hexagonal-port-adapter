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

import {
	IVerifyPhoneCustomerUseCase,
	IVerifyPhoneCustomerCommand,
} from '../../../../../../domain/use-case/v1/verify-phone';
import USE_CASE_TYPES from '../../../../../../domain/use-case/v1/types';
import { VerifyPhoneCustomerAdapter } from './verify-phone-customer.adpter';

@ApiPath({
	name: 'customer',
	path: '/v1/customer',
})
@controller('/v1/customer')
export class VerifyPhoneCustomerController implements interfaces.Controller {
	constructor(
		@inject(USE_CASE_TYPES.VerifyPhoneCustomerUseCase)
		private verifyPhoneCustomerUseCase: IVerifyPhoneCustomerUseCase
	) {}

	@ApiOperationPatch({
		description: '',
		summary: '',
		path: '/{id}/verify-phone',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
			body: {
				model: 'VerifyPhone',
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
	@httpPatch('/:id/verify-phone')
	private async verifyPhone(
		@requestParam('id') id: string,
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new VerifyPhoneCustomerAdapter(response);

		this.verifyPhoneCustomerUseCase.setOutputPort(adapterPort);
		const command: IVerifyPhoneCustomerCommand = { ...request.body, id };

		await this.verifyPhoneCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}
}
