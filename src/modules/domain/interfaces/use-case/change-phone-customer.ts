import { IUseCase } from '@shared/core/use-case';
import { Customer } from '@domain/customer';

export interface IChangePhoneCustomerCommand {
	id: string;
	phone: string;
}

export interface IOutputPort {
	invalid(error: Error): void;
	notFound(error: Error): void;
	unchanged(error: Error): void;
	changed(customer: Customer): void;
}

export interface IChangePhoneCustomerUseCase
	extends IUseCase<IChangePhoneCustomerCommand, IOutputPort> {}
