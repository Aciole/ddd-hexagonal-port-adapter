import {
	ICustomerReadRepository,
	ICustomerWriteRepository,
	types as REPOSITORIES_TYPES,
} from '../../../../domain/repository';
import {
	IChangePhoneCustomerUseCase,
	IChangePhoneCustomerCommand,
	IChangePhoneCustomerOutputPort,
} from '../../../../domain/use-case/v1/change-phone';
import { CustomerId, Phone } from '../../../../domain/value-objets';
import { ChangePhoneCustomerPresenter } from './change-phone-customer.presenter';

import { injectable, inject } from 'inversify';
import { Loggable, LogTransaction } from '../../../../../shared/decorators/log';

@Loggable()
@injectable()
export class ChangePhoneCustomerUseCase implements IChangePhoneCustomerUseCase {
	private _outputPort: IChangePhoneCustomerOutputPort;
	private readonly _customerReadRepository: ICustomerReadRepository;
	private readonly _customerWriteRepository: ICustomerWriteRepository;

	constructor(
		@inject(REPOSITORIES_TYPES.CustomerReadRepository)
		customerReadRepository: ICustomerReadRepository,
		@inject(REPOSITORIES_TYPES.CustomerWriteRepository)
		customerWriteRepository: ICustomerWriteRepository
	) {
		this._outputPort = new ChangePhoneCustomerPresenter();
		this._customerReadRepository = customerReadRepository;
		this._customerWriteRepository = customerWriteRepository;
	}

	setOutputPort(outputPort: IChangePhoneCustomerOutputPort): void {
		this._outputPort = outputPort;
	}

	@LogTransaction
	async execute(
		transactionId: string,
		request: IChangePhoneCustomerCommand
	): Promise<void> {
		const phoneOrError = Phone.create(request.phone, false);

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

		if (customerResult.phone.value === request.phone) {
			this._outputPort.unchanged(new Error(''));
			return;
		}

		customerResult.updatePhone(phoneUpdated);

		await this._customerWriteRepository.update(customerResult);

		this._outputPort.changed(customerResult);
	}
}
