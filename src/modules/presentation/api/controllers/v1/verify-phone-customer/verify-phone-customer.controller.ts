import * as express from 'express';

import {
	IVerifyPhoneCustomerCommand,
	IVerifyPhoneCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/verify-phone.customer';
import { BaseController } from '../../base-controller';

import { VerifyPhoneCustomerAdapter } from './verify-phone-customer.adpter';

export class VerifyPhoneCustomerController extends BaseController {
	private readonly useCase: IVerifyPhoneCustomerUseCase;

	constructor(useCase: IVerifyPhoneCustomerUseCase) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(
		request: express.Request,
		response: express.Response
	): Promise<any> {
		const adapterPort = new VerifyPhoneCustomerAdapter(response);

		this.useCase.setOutputPort(adapterPort);
		const command: IVerifyPhoneCustomerCommand = request.body;

		await this.useCase.execute(`${new Date()}:${Math.random()}`, command);

		return adapterPort.response;
	}
}
