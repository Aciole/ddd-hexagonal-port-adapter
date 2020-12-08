import { IUseCase } from '../../../../../shared/core/use-case';
import { Customer } from '../../../customer';
import { IChangePhoneCustomerCommand } from './change-phone-customer.command';

export interface IOutputPort {
	invalid(error: Error): void;
	notFound(error: Error): void;
	unchanged(error: Error): void;
	changed(customer: Customer): void;
}

export interface IChangePhoneCustomerUseCase
	extends IUseCase<IChangePhoneCustomerCommand, IOutputPort> {}
