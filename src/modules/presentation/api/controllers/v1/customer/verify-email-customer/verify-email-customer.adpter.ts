import * as express from 'express';

import { Customer } from '../../../../../../domain/customer';
import { IVerifyEmailCustomerOutputPort } from '../../../../../../domain/use-case/v1/verify-email';
import { CustomerViewModel } from '../customer.viewmodel';

import { Loggable } from '../../../../../../../shared/decorators/log';
@Loggable()
export class VerifyEmailCustomerAdapter
	implements IVerifyEmailCustomerOutputPort {
	public response: express.Response;

	constructor(response: express.Response) {
		this.response = response;
		this.response.type('application/json');
	}
	invalid(error: Error): void {
		this.response.status(400).json({ error });
	}
	notFound(error: Error): void {
		this.response.status(404).json({ error });
	}
	doesNotBelongToThisCustomer(error: Error): void {
		this.response.status(400).json({ error });
	}
	alreadyBeenVerified(error: Error): void {
		this.response.status(204).json({ error });
	}
	verified(customer: Customer): void {
		const viewmodel = new CustomerViewModel(customer);
		this.response.status(202).json(viewmodel);
	}
}
