import * as express from 'express';

import { IDeleteCustomerOutputPort } from '../../../../../../domain/use-case/v1/delete-customer';

export class DeleteCustomerAdapter implements IDeleteCustomerOutputPort {
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
