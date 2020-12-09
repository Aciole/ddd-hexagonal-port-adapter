import { Customer } from '../../../customer';

export interface IVerifyPhoneCustomerOutputPort {
	invalid(error: Error): void;
	notFound(error: Error): void;
	doesNotBelongToThisCustomer(error: Error): void;
	alreadyBeenVerified(error: Error): void;
	verified(customer: Customer): void;
}
