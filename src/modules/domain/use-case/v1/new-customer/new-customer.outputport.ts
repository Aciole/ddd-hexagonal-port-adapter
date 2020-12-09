import { Customer } from '../../../customer';

export interface INewCustomerOutputPort {
	invalid(error: Error): void;
	duplicate(error: Error): void;
	created(customer: Customer): void;
}
