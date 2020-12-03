import { Customer } from '@domain/customer';

export interface ICustomerWriteRepository {
	create(customer: Customer): Promise<void>;
	update(customer: Customer): Promise<void>;
	delete(customer: Customer): Promise<void>;
}
