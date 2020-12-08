import { IUseCase } from '../../../../../shared/core/use-case';
import { IDeleteCustomerCommand } from './delete-customer.command';

export interface IOutputPort {
	notFound(): void;
	deleted(): void;
}

export interface IDeleteCustomerUseCase
	extends IUseCase<IDeleteCustomerCommand, IOutputPort> {}
