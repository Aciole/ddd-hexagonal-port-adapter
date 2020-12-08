import * as express from 'express';

import { IOutputPort } from '../../../../../../domain/use-case/v1/delete-customer/delete-customer.usecase';

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
