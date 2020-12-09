import { injectable } from 'inversify';

import { ICustomerReadRepository } from '../../../domain/repository/customer-read.repository';
import { Customer } from '../../../../modules/domain/customer';
import { CustomerId } from '../../../../modules/domain/value-objets/customer-id';
import { Email } from '../../../../modules/domain/value-objets/email';
import { Phone } from '../../../../modules/domain/value-objets/phone';
import { Name } from '../../../../modules/domain/value-objets/name';

@injectable()
export class CustomerReadMockRepository implements ICustomerReadRepository {
	private customersData: Customer[] = [
		Customer.create(
			{
				email: Email.create('email@email.com', true, new Date()).getValue(),
				phone: Phone.create('5511999999999', true, new Date()).getValue(),
				name: Name.create('firstname', 'lastname').getValue(),
			},
			CustomerId.create({ id: '1' })
		),
		Customer.create(
			{
				email: Email.create('email1@email.com', true, new Date()).getValue(),
				phone: Phone.create('5511988888888', true, new Date()).getValue(),
				name: Name.create('first', 'last').getValue(),
			},
			CustomerId.create({ id: '2' })
		),
	];

	getById(id: CustomerId): Promise<Customer> {
		let customer: Customer;

		const result = this.customersData.filter(
			(customer) => customer.id?.id == id.id
		);

		if (result.length > 0) {
			customer = result[0];
		}

		return new Promise((resolve) => resolve(customer));
	}
	getByEmail(email: Email): Promise<Customer> {
		let customer: Customer;

		const result = this.customersData.filter(
			(customer) => customer.email.value == email.value
		);

		if (result.length > 0) {
			customer = result[0];
		}

		if (result.length > 0) {
			customer = result[0];
		}

		return new Promise((resolve) => resolve(customer));
	}
	getByEmailAndPhone(email: Email, phone: Phone): Promise<Customer[]> {
		let customers: Customer[];

		customers = this.customersData.filter(
			(customer) =>
				customer.email.value == email.value ||
				customer.phone.value == phone.value
		);

		return new Promise((resolve) => resolve(customers));
	}
	getByPhone(phone: Phone): Promise<Customer> {
		let customer: Customer;

		const result = this.customersData.filter(
			(customer) => customer.phone.value == phone.value
		);

		if (result.length > 0) {
			customer = result[0];
		}

		return new Promise((resolve) => resolve(customer));
	}
}
