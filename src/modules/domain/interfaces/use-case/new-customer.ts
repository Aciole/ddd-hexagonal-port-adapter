import { IUseCase } from '@shared/core/use-case';
import { Customer } from '@domain/customer';

export interface INewCustomerCommand {
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
}

export interface IOutputPort {
	invalid(error: Error): void;
	duplicate(error: Error): void;
	created(customer: Customer): void;
}

export interface INewCustomerUseCase
	extends IUseCase<INewCustomerCommand, IOutputPort> {}
