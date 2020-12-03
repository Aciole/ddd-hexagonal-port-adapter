import { Entity } from '@core/entity';
import { CustomerId } from './value-objets/customer-id';
import { Email } from './value-objets/email';
import { Name } from './value-objets/name';
import { Phone } from './value-objets/phone';

interface CustomerProps {
	name: Name;
	email: Email;
	phone: Phone;
}

export class Customer extends Entity<CustomerProps, CustomerId> {
	public name: Name;
	public email: Email;
	public phone: Phone;

	private constructor(props: CustomerProps, id?: CustomerId) {
		super(props, id);
		this.name = props.name;
		this.email = props.email;
		this.phone = props.phone;
	}

	public updateName(name: Name) {
		this.name = name;
	}
	public updateEmail(email: Email) {
		this.email = email;
	}
	public updatePhone(phone: Phone) {
		this.phone = phone;
	}

	public static create(props: CustomerProps, id?: CustomerId): Customer {
		return new Customer(props, id);
	}
}
