import * as express from 'express';
import { BaseController } from '../../base-controller';

import {
	IDeleteCustomerCommand,
	IDeleteCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/delete-customer';
import { DeleteCustomerAdapter } from './delete-customer.adpter';

export class DeleteCustomerController extends BaseController {
	private readonly useCase: IDeleteCustomerUseCase;

	constructor(useCase: IDeleteCustomerUseCase) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(
		request: express.Request,
		response: express.Response
	): Promise<any> {
		const adapterPort = new DeleteCustomerAdapter(response);

		this.useCase.setOutputPort(adapterPort);
		const command: IDeleteCustomerCommand = request.body;

		await this.useCase.execute(`${new Date()}:${Math.random()}`, command);

		return adapterPort.response;
	}
}
