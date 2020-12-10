import { injectable, inject } from 'inversify';
import {
	ICustomerReadRepository,
	ICustomerWriteRepository,
	types as REPOSITORIES_TYPES,
} from '../../../../domain/repository';
import {
	IVerifyEmailCustomerCommand,
	IVerifyEmailCustomerUseCase,
	IVerifyEmailCustomerOutputPort,
} from '../../../../domain/use-case/v1/verify-email';
import { CustomerId, Email } from '../../../../domain/value-objets';
import { VerifyEmailCustomerPresenter } from './verify-email-customer.presenter';

import { Loggable, LogTransaction } from '../../../../../shared/decorators/log';

@Loggable()
@injectable()
export class VerifyEmailCustomerUseCase implements IVerifyEmailCustomerUseCase {
	private _outputPort: IVerifyEmailCustomerOutputPort;
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

	setOutputPort(outputPort: IVerifyEmailCustomerOutputPort): void {
		this._outputPort = outputPort;
	}

	@LogTransaction
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
