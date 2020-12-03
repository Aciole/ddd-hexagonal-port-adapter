import { IOutputPort } from '@domain/interfaces/use-case/delete-customer';

export class DeleteCustomerPresenter implements IOutputPort {
	notFound(): void {
		throw new Error('Method not implemented.');
	}
	deleted(): void {
		throw new Error('Method not implemented.');
	}
}
