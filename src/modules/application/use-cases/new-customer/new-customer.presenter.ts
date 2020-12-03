import { Customer } from '@domain/customer';
import { IOutputPort } from '@domain/interfaces/use-case/new-customer';

export class NewCustomerPresenter implements IOutputPort {
	invalid(err: Error): void {
		throw new Error('Method not implemented.');
	}
	duplicate(err: Error): void {
		throw new Error('Method not implemented.');
	}
	created(customer: Customer): void {
		throw new Error('Method not implemented.');
	}
}
