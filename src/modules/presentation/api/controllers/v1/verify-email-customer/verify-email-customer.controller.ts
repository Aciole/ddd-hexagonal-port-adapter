import * as express from 'express';

import {
	IVerifyEmailCustomerCommand,
	IVerifyEmailCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/verify-email.customer';
import { BaseController } from '../../base-controller';

import { VerifyEmailCustomerAdapter } from './verify-email-customer.adpter';

export class VerifyEmailCustomerController extends BaseController {
	private readonly useCase: IVerifyEmailCustomerUseCase;

	constructor(useCase: IVerifyEmailCustomerUseCase) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(
		request: express.Request,
		response: express.Response
	): Promise<any> {
		const adapterPort = new VerifyEmailCustomerAdapter(response);

		this.useCase.setOutputPort(adapterPort);
		const command: IVerifyEmailCustomerCommand = request.body;

		await this.useCase.execute(`${new Date()}:${Math.random()}`, command);

		return adapterPort.response;
	}
}
