import * as express from 'express';

import { Customer } from '../../../../../../domain/customer';
import { IChangePhoneCustomerOutputPort } from '../../../../../../domain/use-case/v1/change-phone';
import { CustomerViewModel } from '../customer.viewmodel';

export class ChangePhoneCustomerAdapter
	implements IChangePhoneCustomerOutputPort {
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
	unchanged(error: Error): void {
		this.response.status(409).json({ error });
	}
	changed(customer: Customer): void {
		const viewmodel = new CustomerViewModel(customer);
		this.response.status(202).json(viewmodel);
	}
}
