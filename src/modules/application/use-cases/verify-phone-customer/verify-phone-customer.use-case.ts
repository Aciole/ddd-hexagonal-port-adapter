import { ICustomerReadRepository } from '../../../domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../../domain/interfaces/repository/customer-write.repository';
import {
	IOutputPort,
	IVerifyPhoneCustomerCommand,
	IVerifyPhoneCustomerUseCase,
} from '../../../domain/interfaces/use-case/verify-phone.customer';
import { CustomerId } from '../../../domain/value-objets/customer-id';
import { Phone } from '../../../domain/value-objets/phone';
import { VerifyPhoneCustomerPresenter } from './verify-phone-customer.presenter';

import { injectable, inject } from 'inversify';
import REPOSITORIES_TYPES from '../../../domain/interfaces/repository/types';
@injectable()
export class VerifyPhoneCustomerUseCase implements IVerifyPhoneCustomerUseCase {
	private _outputPort: IOutputPort;
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

	setOutputPort(outputPort: IOutputPort): void {
		this._outputPort = outputPort;
	}

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
