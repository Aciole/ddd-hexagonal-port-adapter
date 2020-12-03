import { Customer } from '@domain/customer';
import { IOutputPort } from '@domain/interfaces/use-case/verify-phone.customer';

export class VerifyPhoneCustomerPresenter implements IOutputPort {
	invalid(error: Error): void {
		throw new Error('Method not implemented.');
	}
	notFound(error: Error): void {
		throw new Error('Method not implemented.');
	}
	alreadyBeenVerified(error: Error): void {
		throw new Error('Method not implemented.');
	}
	verified(customer: Customer): void {
		throw new Error('Method not implemented.');
	}
}
