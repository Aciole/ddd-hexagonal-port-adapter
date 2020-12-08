import { IUseCase } from '../../../../../shared/core/use-case';
import { Customer } from '../../../customer';
import { IVerifyEmailCustomerCommand } from './verify-email-customer.command';

export interface IOutputPort {
	invalid(error: Error): void;
	notFound(error: Error): void;
	doesNotBelongToThisCustomer(error: Error): void;
	alreadyBeenVerified(error: Error): void;
	verified(customer: Customer): void;
}

export interface IVerifyEmailCustomerUseCase
	extends IUseCase<IVerifyEmailCustomerCommand, IOutputPort> {}
