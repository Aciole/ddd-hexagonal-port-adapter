import * as express from 'express';
import { BaseController } from '../../base-controller';

import {
	INewCustomerCommand,
	INewCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/new-customer';
import { NewCustomerAdapter } from './new-customer.adpter';

export class NewCustomerController extends BaseController {
	private readonly useCase: INewCustomerUseCase;

	constructor(useCase: INewCustomerUseCase) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(
		request: express.Request,
		response: express.Response
	): Promise<any> {
		const adapterPort = new NewCustomerAdapter(response);

		this.useCase.setOutputPort(adapterPort);
		const command: INewCustomerCommand = request.body;

		await this.useCase.execute(`${new Date()}:${Math.random()}`, command);

		return adapterPort.response;
	}
}
