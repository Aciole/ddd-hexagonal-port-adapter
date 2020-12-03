import { Customer } from '@domain/customer';
import { IOutputPort } from '@domain/interfaces/use-case/change-phone-customer';

export class ChangePhoneCustomerPresenter implements IOutputPort {
	invalid(error: Error): void {
		throw new Error('Method not implemented.');
	}
	notFound(error: Error): void {
		throw new Error('Method not implemented.');
	}
	unchanged(error: Error): void {
		throw new Error('Method not implemented.');
	}
	changed(customer: Customer): void {
		throw new Error('Method not implemented.');
	}
}
