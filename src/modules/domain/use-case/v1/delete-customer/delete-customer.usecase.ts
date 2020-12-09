import { IUseCase } from '../../../../../shared/core/use-case';
import { IDeleteCustomerCommand } from './delete-customer.command';
import { IDeleteCustomerOutputPort } from './delete-customer.outputport';

export interface IDeleteCustomerUseCase
	extends IUseCase<IDeleteCustomerCommand, IDeleteCustomerOutputPort> {}
