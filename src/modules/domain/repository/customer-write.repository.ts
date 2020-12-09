import { Customer } from '../customer';

export interface ICustomerWriteRepository {
	create(customer: Customer): Promise<void>;
	update(customer: Customer): Promise<void>;
	delete(customer: Customer): Promise<void>;
}
