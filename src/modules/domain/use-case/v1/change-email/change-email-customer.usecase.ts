import { IUseCase } from '../../../../../shared/core/use-case';
import { Customer } from '../../../customer';
import { IChangeEmailCustomerCommand } from './change-email-customer.command';

export interface IOutputPort {
	invalid(error: Error): void;
	notFound(error: Error): void;
	unchanged(error: Error): void;
	changed(customer: Customer): void;
}

export interface IChangeEmailCustomerUseCase
	extends IUseCase<IChangeEmailCustomerCommand, IOutputPort> {}
