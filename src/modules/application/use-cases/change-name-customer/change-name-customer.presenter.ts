import { Customer } from '@domain/customer';
import { IOutputPort } from '@domain/interfaces/use-case/change-name-customer';

export class ChangeNameCustomerPresenter implements IOutputPort {
	notFound(error: Error): void {
		throw new Error('Method not implemented.');
	}
	invalid(error: Error): void {
		throw new Error('Method not implemented.');
	}

	unchanged(error: Error): void {
		throw new Error('Method not implemented.');
	}
	changed(customer: Customer): void {
		throw new Error('Method not implemented.');
	}
}
