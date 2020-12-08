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

import { IChangePhoneCustomerUseCase } from '../../../../../../domain/use-case/v1/change-phone/change-phone-customer.usecase';
import { IChangePhoneCustomerCommand } from '../../../../../../domain/use-case/v1/change-phone/change-phone-customer.command';
import { ChangePhoneCustomerAdapter } from './change-phone-customer.adapter';

@ApiPath({
	name: 'customer',
	path: '/v1/customer',
})
@controller('/v1/customer')
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
