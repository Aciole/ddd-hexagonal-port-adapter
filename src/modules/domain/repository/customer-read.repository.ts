import { Customer } from '../customer';
import { CustomerId } from '../value-objets/customer-id';
import { Email } from '../value-objets/email';
import { Phone } from '../value-objets/phone';

export interface ICustomerReadRepository {
	getById(id: CustomerId): Promise<Customer>;
	getByEmail(email: Email): Promise<Customer>;
	getByEmailAndPhone(email: Email, phone: Phone): Promise<Customer[]>;
	getByPhone(phone: Phone): Promise<Customer>;
}
