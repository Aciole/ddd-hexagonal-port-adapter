import * as express from 'express';

import { Customer } from '../../../../../../domain/customer';
import { IOutputPort } from '../../../../../../domain/interfaces/use-case/new-customer';
import { CustomerViewModel } from '../customer.viewmodel';

export class NewCustomerAdapter implements IOutputPort {
	public response: express.Response;

	constructor(response: express.Response) {
		this.response = response;
		this.response.type('application/json');
	}

	invalid(error: Error): void {
		this.response.status(400).json({ error });
	}
	duplicate(error: Error): void {
		this.response.status(409).json({ error });
	}
	created(customer: Customer): void {
		const viewmodel = new CustomerViewModel(customer);
		this.response.status(201).json(viewmodel);
	}
}
