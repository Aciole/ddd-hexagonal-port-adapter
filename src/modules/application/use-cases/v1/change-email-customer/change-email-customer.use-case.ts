import {
	ICustomerReadRepository,
	ICustomerWriteRepository,
	types as REPOSITORIES_TYPES,
} from '../../../../domain/repository';
import {
	IChangeEmailCustomerUseCase,
	IChangeEmailCustomerOutputPort,
	IChangeEmailCustomerCommand,
} from '../../../../domain/use-case/v1/change-email';
import { Email, CustomerId } from '../../../../domain/value-objets/';
import { ChangeEmailCustomerPresenter } from './change-email-customer.presenter';

import { injectable, inject } from 'inversify';

@injectable()
export class ChangeEmailCustomerUseCase implements IChangeEmailCustomerUseCase {
	private _outputPort: IChangeEmailCustomerOutputPort;
	private readonly _customerReadRepository: ICustomerReadRepository;
	private readonly _customerWriteRepository: ICustomerWriteRepository;

	constructor(
		@inject(REPOSITORIES_TYPES.CustomerReadRepository)
		customerReadRepository: ICustomerReadRepository,
		@inject(REPOSITORIES_TYPES.CustomerWriteRepository)
		customerWriteRepository: ICustomerWriteRepository
	) {
		this._outputPort = new ChangeEmailCustomerPresenter();
		this._customerReadRepository = customerReadRepository;
		this._customerWriteRepository = customerWriteRepository;
	}

	setOutputPort(outputPort: IChangeEmailCustomerOutputPort): void {
		this._outputPort = outputPort;
	}

	async execute(
		transactionId: string,
		request: IChangeEmailCustomerCommand
	): Promise<void> {
		const emailOrError = Email.create(request.email, false);

		if (emailOrError.isFailure) {
			this._outputPort.invalid(new Error(''));
			return;
		}

		const emailUpdated = emailOrError.getValue();

		const customerResult = await this._customerReadRepository.getById(
			CustomerId.create({ id: request.id })
		);

		if (customerResult == null) {
			this._outputPort.notFound(new Error(''));
			return;
		}

		if (customerResult.email.value === request.email) {
			this._outputPort.unchanged(new Error(''));
			return;
		}

		customerResult.updateEmail(emailUpdated);

		await this._customerWriteRepository.update(customerResult);

		this._outputPort.changed(customerResult);
		return;
	}
}
