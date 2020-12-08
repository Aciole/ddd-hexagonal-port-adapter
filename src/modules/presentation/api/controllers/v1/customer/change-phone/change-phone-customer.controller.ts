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

import { IChangePhoneCustomerUseCase } from '../../../../../../domain/interfaces/use-case/change-phone-customer';
import { ChangePhoneCustomerAdapter } from './change-phone-customer.adapter';
import { IChangePhoneCustomerCommand } from '../../../../../../domain/interfaces/commands/change-phone-customer.command';

@ApiPath({
	name: 'customer',
	path: '/customer',
})
@controller('/customer')
export class ChangePhoneCustomerController implements interfaces.Controller {
	constructor(
		@inject(USE_CASE_TYPES.ChangePhoneCustomerUseCase)
		private changePhoneCustomerUseCase: IChangePhoneCustomerUseCase
	) {}

	@ApiOperationPatch({
		description: '',
		summary: '',
		path: '/{id}/phone',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
			body: {
				model: 'ChangePhone',
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
	@httpPatch('/:id/phone')
	private async changePhone(
		@requestParam('id') id: string,
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new ChangePhoneCustomerAdapter(response);

		this.changePhoneCustomerUseCase.setOutputPort(adapterPort);

		const command: IChangePhoneCustomerCommand = { ...request.body, id };

		await this.changePhoneCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}
}
