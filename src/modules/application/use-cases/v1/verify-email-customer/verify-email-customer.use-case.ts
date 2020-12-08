import { ICustomerReadRepository } from '../../../../domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../../../domain/interfaces/repository/customer-write.repository';
import {
	IOutputPort,
	IVerifyEmailCustomerUseCase,
} from '../../../../domain/use-case/v1/verify-email/verify-email.customer.usecase';
import { CustomerId } from '../../../../domain/value-objets/customer-id';
import { Email } from '../../../../domain/value-objets/email';
import { VerifyEmailCustomerPresenter } from './verify-email-customer.presenter';

import { injectable, inject } from 'inversify';
import REPOSITORIES_TYPES from '../../../../domain/interfaces/repository/types';
import { IVerifyEmailCustomerCommand } from '../../../../domain/use-case/v1/verify-email/verify-email-customer.command';

@injectable()
export class VerifyEmailCustomerUseCase implements IVerifyEmailCustomerUseCase {
	private _outputPort: IOutputPort;
	private readonly _customerReadRepository: ICustomerReadRepository;
	private readonly _customerWriteRepository: ICustomerWriteRepository;

	constructor(
		@inject(REPOSITORIES_TYPES.CustomerReadRepository)
		customerReadRepository: ICustomerReadRepository,
		@inject(REPOSITORIES_TYPES.CustomerWriteRepository)
		customerWriteRepository: ICustomerWriteRepository
	) {
		this._outputPort = new VerifyEmailCustomerPresenter();
		this._customerReadRepository = customerReadRepository;
		this._customerWriteRepository = customerWriteRepository;
	}

	setOutputPort(outputPort: IOutputPort): void {
		this._outputPort = outputPort;
	}

	async execute(
		transactionId: string,
		request: IVerifyEmailCustomerCommand
	): Promise<void> {
		const EmailOrError = Email.create(request.email, true, new Date());

		if (EmailOrError.isFailure) {
			this._outputPort.invalid(new Error(''));
			return;
		}

		const emailUpdated = EmailOrError.getValue();

		const customerResult = await this._customerReadRepository.getById(
			CustomerId.create({ id: request.id })
		);

		if (customerResult == null) {
			this._outputPort.notFound(new Error(''));
			return;
		}

		if (customerResult.email.value != request.email) {
			this._outputPort.doesNotBelongToThisCustomer(new Error(''));
			return;
		}

		if (customerResult.email.verified == true) {
			this._outputPort.alreadyBeenVerified(new Error(''));
			return;
		}

		customerResult.updateEmail(emailUpdated);

		await this._customerWriteRepository.update(customerResult);

		this._outputPort.verified(customerResult);
	}
}