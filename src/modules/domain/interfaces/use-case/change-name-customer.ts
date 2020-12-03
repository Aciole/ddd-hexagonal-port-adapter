import { IUseCase } from '@shared/core/use-case';
import { Customer } from '@domain/customer';

export interface IChangeNameCustomerCommand {
	id: string;
	firstname: string;
	lastname: string;
}

export interface IOutputPort {
	invalid(error: Error): void;
	notFound(error: Error): void;
	unchanged(error: Error): void;
	changed(customer: Customer): void;
}

export interface IChangeNameCustomerUseCase
	extends IUseCase<IChangeNameCustomerCommand, IOutputPort> {}
