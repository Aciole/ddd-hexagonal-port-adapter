import * as express from 'express';
import { BaseController } from '../../base-controller';

import {
	IChangePhoneCustomerCommand,
	IChangePhoneCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/change-phone-customer';
import { ChangePhoneCustomerAdapter } from './change-phone-customer.adapter';

export class ChangePhoneCustomerController extends BaseController {
	private readonly useCase: IChangePhoneCustomerUseCase;

	constructor(useCase: IChangePhoneCustomerUseCase) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(
		request: express.Request,
		response: express.Response
	): Promise<any> {
		const adapterPort = new ChangePhoneCustomerAdapter(response);

		this.useCase.setOutputPort(adapterPort);

		const command: IChangePhoneCustomerCommand = request.body;

		await this.useCase.execute(`${new Date()}:${Math.random()}`, command);

		return adapterPort.response;
	}
}
