import * as express from 'express';

import { Customer } from '../../../../../domain/customer';
import { IOutputPort } from '../../../../../domain/interfaces/use-case/change-name-customer';

export class ChangeNameCustomerAdapter implements IOutputPort {
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
		this.response.status(202).json({ customer });
	}
}
