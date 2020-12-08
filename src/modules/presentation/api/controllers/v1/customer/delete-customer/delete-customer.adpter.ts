import * as express from 'express';

import { Customer } from '../../../../../../domain/customer';
import { IOutputPort } from '../../../../../../domain/interfaces/use-case/delete-customer';

export class DeleteCustomerAdapter implements IOutputPort {
	public response: express.Response;

	constructor(response: express.Response) {
		this.response = response;
		this.response.type('application/json');
	}
	invalid(error: Error): void {
		this.response.status(400).json({ error });
	}
	notFound(): void {
		this.response.status(404).json({ error: 'Customer Not Found!' });
	}
	deleted(): void {
		this.response.status(202);
	}
}
