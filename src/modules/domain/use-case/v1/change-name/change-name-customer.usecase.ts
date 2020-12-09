import { IUseCase } from '../../../../../shared/core/use-case';
import { IChangeNameCustomerCommand } from './change-name-customer.command';
import { IChangeNameCustomerOutputPort } from './change-name-customer.outputport';

export interface IChangeNameCustomerUseCase
	extends IUseCase<IChangeNameCustomerCommand, IChangeNameCustomerOutputPort> {}
