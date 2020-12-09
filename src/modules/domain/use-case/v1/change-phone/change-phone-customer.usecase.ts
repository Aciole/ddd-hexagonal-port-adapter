import { IUseCase } from '../../../../../shared/core/use-case';
import { IChangePhoneCustomerCommand } from './change-phone-customer.command';
import { IChangeNameCustomerOutputPort } from './change-phone-customer.outputport';

export interface IChangePhoneCustomerUseCase
	extends IUseCase<
		IChangePhoneCustomerCommand,
		IChangeNameCustomerOutputPort
	> {}
