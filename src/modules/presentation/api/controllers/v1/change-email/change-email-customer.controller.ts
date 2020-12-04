import * as express from 'express';
import { BaseController } from '../../base-controller';

import {
	IChangeEmailCustomerCommand,
	IChangeEmailCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/change-email-customer';
import { ChangeEmailCustomerAdapter } from './change-email-customer.adapter';

export class ChangeEmailCustomerController extends BaseController {
	private readonly useCase: IChangeEmailCustomerUseCase;

	constructor(useCase: IChangeEmailCustomerUseCase) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(
		request: express.Request,
		response: express.Response
	): Promise<any> {
		const adapterPort = new ChangeEmailCustomerAdapter(response);

		this.useCase.setOutputPort(adapterPort);

		const command: IChangeEmailCustomerCommand = request.body;

		await this.useCase.execute(`${new Date()}:${Math.random()}`, command);

		return adapterPort.response;
	}
}
