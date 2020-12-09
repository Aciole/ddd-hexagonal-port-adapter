import { IUseCase } from '../../../../../shared/core/use-case';
import { IChangeEmailCustomerCommand } from './change-email-customer.command';
import { IChangeEmailCustomerOutputPort } from './change-email-customer.outputport';

export interface IChangeEmailCustomerUseCase
	extends IUseCase<
		IChangeEmailCustomerCommand,
		IChangeEmailCustomerOutputPort
	> {}
