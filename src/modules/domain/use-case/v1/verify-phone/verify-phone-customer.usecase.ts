import { IUseCase } from '../../../../../shared/core/use-case';
import { IVerifyPhoneCustomerCommand } from './verify-phone-customer.command';
import { IVerifyPhoneCustomerOutputPort } from './verify-phone-customer.outputport';

export interface IVerifyPhoneCustomerUseCase
	extends IUseCase<
		IVerifyPhoneCustomerCommand,
		IVerifyPhoneCustomerOutputPort
	> {}
