import { IUseCase } from '../../../../shared/core/use-case';
import { Customer } from '../../customer';
import { INewCustomerCommand } from '../commands/new-customer.command';

export interface IOutputPort {
	invalid(error: Error): void;
	duplicate(error: Error): void;
	created(customer: Customer): void;
}

export interface INewCustomerUseCase
	extends IUseCase<INewCustomerCommand, IOutputPort> {}
