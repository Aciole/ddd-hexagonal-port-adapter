import { Customer } from '@domain/customer';
import { IUseCase } from '@shared/core/use-case';

export interface IVerifyPhoneCustomerCommand {
	id: string;
	phone: string;
}

export interface IOutputPort {
	invalid(error: Error): void;
	notFound(error: Error): void;
	alreadyBeenVerified(error: Error): void;
	verified(customer: Customer): void;
}

export interface IVerifyPhoneCustomerUseCase
	extends IUseCase<IVerifyPhoneCustomerCommand, IOutputPort> {}
