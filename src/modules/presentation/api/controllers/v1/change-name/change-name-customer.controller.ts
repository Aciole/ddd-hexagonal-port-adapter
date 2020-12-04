import * as express from 'express';
import { BaseController } from '../../base-controller';

import {
	IChangeNameCustomerCommand,
	IChangeNameCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/change-name-customer';
import { ChangeNameCustomerAdapter } from './change-name-customer.adapter';

export class ChangeNameCustomerController extends BaseController {
	private readonly useCase: IChangeNameCustomerUseCase;

	constructor(useCase: IChangeNameCustomerUseCase) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(
		request: express.Request,
		response: express.Response
	): Promise<any> {
		const adapterPort = new ChangeNameCustomerAdapter(response);

		this.useCase.setOutputPort(adapterPort);

		const command: IChangeNameCustomerCommand = request.body;

		await this.useCase.execute(`${new Date()}:${Math.random()}`, command);

		return adapterPort.response;
	}
}
