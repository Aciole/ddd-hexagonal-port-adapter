import { IUseCase } from '../../../../../shared/core/use-case';
import { INewCustomerCommand } from './new-customer.command';
import { INewCustomerOutputPort } from './new-customer.outputport';

export interface INewCustomerUseCase
	extends IUseCase<INewCustomerCommand, INewCustomerOutputPort> {}
