import { Customer } from '../../../customer';

export interface IChangeEmailCustomerOutputPort {
	invalid(error: Error): void;
	notFound(error: Error): void;
	unchanged(error: Error): void;
	changed(customer: Customer): void;
}
