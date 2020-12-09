import { IUseCase } from '../../../../../shared/core/use-case';
import { IVerifyEmailCustomerCommand } from './verify-email-customer.command';
import { IVerifyEmailCustomerOutputPort } from './verify-email-customer.outputport';

export interface IVerifyEmailCustomerUseCase
	extends IUseCase<
		IVerifyEmailCustomerCommand,
		IVerifyEmailCustomerOutputPort
	> {}
