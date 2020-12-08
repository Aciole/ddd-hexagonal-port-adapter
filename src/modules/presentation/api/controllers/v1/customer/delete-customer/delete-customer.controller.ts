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
import USE_CASE_TYPES from '../../../../../../domain/interfaces/use-case/types';
import { IDeleteCustomerUseCase } from '../../../../../../domain/interfaces/use-case/delete-customer';
import { DeleteCustomerAdapter } from './delete-customer.adpter';
import { IDeleteCustomerQuery } from 'modules/domain/interfaces/queries/delete-customer.query';

@ApiPath({
	name: 'customer',
	path: '/customer',
})
@controller('/customer')
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
		const command: IDeleteCustomerQuery = { id };

		await this.deleteCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}
}
