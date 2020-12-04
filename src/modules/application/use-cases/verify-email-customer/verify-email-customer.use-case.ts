import { ICustomerReadRepository } from '../../../domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../../domain/interfaces/repository/customer-write.repository';
import {
	IOutputPort,
	IVerifyEmailCustomerCommand,
	IVerifyEmailCustomerUseCase,
} from '../../../domain/interfaces/use-case/verify-email.customer';
import { CustomerId } from '../../../domain/value-objets/customer-id';
import { Email } from '../../../domain/value-objets/email';
import { VerifyEmailCustomerPresenter } from './verify-email-customer.presenter';

export class VerifyPhoneCustomerUseCase implements IVerifyEmailCustomerUseCase {
	private _outputPort: IOutputPort;
	private readonly _customerReadRepository: ICustomerReadRepository;
	private readonly _customerWriteRepository: ICustomerWriteRepository;

	constructor(
		customerReadRepository: ICustomerReadRepository,
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