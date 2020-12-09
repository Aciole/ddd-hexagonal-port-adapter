import { injectable } from 'inversify';
import { Customer } from 'modules/domain/customer';
import { ICustomerWriteRepository } from '../../../domain/repository/customer-write.repository';

@injectable()
export class CustomerWriteMockRepository implements ICustomerWriteRepository {
	create(customer: Customer): Promise<void> {
		return new Promise((resolve) => resolve());
	}
	update(customer: Customer): Promise<void> {
		return new Promise((resolve) => resolve());
	}
	delete(customer: Customer): Promise<void> {
		return new Promise((resolve) => resolve());
	}
}
