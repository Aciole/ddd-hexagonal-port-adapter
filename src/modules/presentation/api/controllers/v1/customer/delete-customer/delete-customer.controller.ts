import * as express from 'express';
import { inject } from 'inversify';
import {
	interfaces,
	controller,
	response,
	requestParam,
	httpDelete,
} from 'inversify-express-utils';
import {
	ApiOperationDelete,
	ApiPath,
	SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import USE_CASE_TYPES from '../../../../../../domain/use-case/v1/types';
import { IDeleteCustomerUseCase } from '../../../../../../domain/use-case/v1/delete-customer/delete-customer.usecase';
import { DeleteCustomerAdapter } from './delete-customer.adpter';
import { IDeleteCustomerCommand } from '../../../../../../domain/use-case/v1/delete-customer/delete-customer.command';

@ApiPath({
	name: 'customer',
	path: '/v1/customer',
})
@controller('/v1/customer')
export class DeleteCustomerController implements interfaces.Controller {
	constructor(
		@inject(USE_CASE_TYPES.DeleteCustomerUseCase)
		private deleteCustomerUseCase: IDeleteCustomerUseCase
	) {}

	@ApiOperationDelete({
		description: '',
		summary: '',
		path: '/{id}',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
		},
		responses: {
			202: {},
			400: {},
			404: {},
		},
	})
	@httpDelete('/:id')
	private async delete(
		@requestParam('id') id: string,
		@response() response: express.Response
	) {
		const adapterPort = new DeleteCustomerAdapter(response);

		this.deleteCustomerUseCase.setOutputPort(adapterPort);
		const command: IDeleteCustomerCommand = { id };

		await this.deleteCustomerUseCase.execute(`${Math.random()}`, command);

		return adapterPort.response;
	}
}
