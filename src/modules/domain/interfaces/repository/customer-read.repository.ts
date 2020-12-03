import { Customer } from '@domain/customer';
import { CustomerId } from '@domain/value-objets/customer-id';
import { Email } from '@domain/value-objets/email';
import { Phone } from '@domain/value-objets/phone';

export interface ICustomerReadRepository {
	getById(id: CustomerId): Promise<Customer>;
	getByEmail(email: Email): Promise<Customer>;
	getByEmailAndPhone(email: Email, phone: Phone): Promise<Customer[]>;
	getByPhone(phone: Phone): Promise<Customer>;
}
