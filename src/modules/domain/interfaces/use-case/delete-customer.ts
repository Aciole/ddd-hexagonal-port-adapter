import { IUseCase } from '../../../../shared/core/use-case';
import { IDeleteCustomerQuery } from '../queries/delete-customer.query';

export interface IOutputPort {
	notFound(): void;
	deleted(): void;
}

export interface IDeleteCustomerUseCase
	extends IUseCase<IDeleteCustomerQuery, IOutputPort> {}
