import { ICustomerReadRepository } from '../../../../domain/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../../../domain/repository/customer-write.repository';
import {
	IVerifyPhoneCustomerOutputPort,
	IVerifyPhoneCustomerCommand,
	IVerifyPhoneCustomerUseCase,
} from '../../../../domain/use-case/v1/verify-phone';
import { CustomerId, Phone } from '../../../../domain/value-objets';
import { VerifyPhoneCustomerPresenter } from './verify-phone-customer.presenter';

import { injectable, inject } from 'inversify';
import REPOSITORIES_TYPES from '../../../../domain/repository/types';

import { Loggable, LogTransaction } from '../../../../../shared/decorators/log';

@Loggable()
@injectable()
export class VerifyPhoneCustomerUseCase implements IVerifyPhoneCustomerUseCase {
	private _outputPort: IVerifyPhoneCustomerOutputPort;
	private readonly _customerReadRepository: ICustomerReadRepository;
	private readonly _customerWriteRepository: ICustomerWriteRepository;

	constructor(
		@inject(REPOSITORIES_TYPES.CustomerReadRepository)
		customerReadRepository: ICustomerReadRepository,
		@inject(REPOSITORIES_TYPES.CustomerWriteRepository)
		customerWriteRepository: ICustomerWriteRepository
	) {
		this._outputPort = new VerifyPhoneCustomerPresenter();
		this._customerReadRepository = customerReadRepository;
		this._customerWriteRepository = customerWriteRepository;
	}

	setOutputPort(outputPort: IVerifyPhoneCustomerOutputPort): void {
		this._outputPort = outputPort;
	}

	@LogTransaction
	async execute(
		transactionId: string,
		request: IVerifyPhoneCustomerCommand
	): Promise<void> {
		const phoneOrError = Phone.create(request.phone, true, new Date());

		if (phoneOrError.isFailure) {
			this._outputPort.invalid(new Error(''));
			return;
		}

		const phoneUpdated = phoneOrError.getValue();

		const customerResult = await this._customerReadRepository.getById(
			CustomerId.create({ id: request.id })
		);

		if (customerResult == null) {
			this._outputPort.notFound(new Error(''));
			return;
		}

		if (customerResult.phone.value != request.phone) {
			this._outputPort.doesNotBelongToThisCustomer(new Error(''));
			return;
		}

		if (customerResult.phone.verified == true) {
			this._outputPort.alreadyBeenVerified(new Error(''));
			return;
		}

		customerResult.updatePhone(phoneUpdated);

		await this._customerWriteRepository.update(customerResult);

		this._outputPort.verified(customerResult);
	}
}
