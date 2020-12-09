import { Customer } from '../../../customer';

export interface IChangeNameCustomerOutputPort {
	invalid(error: Error): void;
	notFound(error: Error): void;
	unchanged(error: Error): void;
	changed(customer: Customer): void;
}
