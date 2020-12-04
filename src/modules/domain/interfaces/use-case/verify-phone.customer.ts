import { IUseCase } from '../../../../shared/core/use-case';
import { Customer } from '../../customer';

export interface IVerifyPhoneCustomerCommand {
	id: string;
	phone: string;
}

export interface IOutputPort {
	invalid(error: Error): void;
	notFound(error: Error): void;
	doesNotBelongToThisCustomer(error: Error): void;
	alreadyBeenVerified(error: Error): void;
	verified(customer: Customer): void;
}

export interface IVerifyPhoneCustomerUseCase
	extends IUseCase<IVerifyPhoneCustomerCommand, IOutputPort> {}
