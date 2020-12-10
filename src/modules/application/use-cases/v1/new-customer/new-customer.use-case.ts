import { injectable, inject } from 'inversify';

import { NewCustomerPresenter } from './new-customer.presenter';
import { Result } from '../../../../../shared/core/result';
import {
	INewCustomerUseCase,
	INewCustomerCommand,
	INewCustomerOutputPort,
} from '../../../../domain/use-case/v1/new-customer';

import { Email, Phone, Name } from '../../../../domain/value-objets';
import { Customer } from '../../../../domain/customer';
import {
	ICustomerReadRepository,
	ICustomerWriteRepository,
	types as REPOSITORIES_TYPES,
} from '../../../../domain/repository';

import { Loggable, LogTransaction } from '../../../../../shared/decorators/log';

@Loggable()
@injectable()
export class NewCustomerUseCase implements INewCustomerUseCase {
	private _outputPort: INewCustomerOutputPort;
	private readonly _customerReadRepository: ICustomerReadRepository;
	private readonly _customerWriteRepository: ICustomerWriteRepository;

	constructor(
		@inject(REPOSITORIES_TYPES.CustomerReadRepository)
		customerReadRepository: ICustomerReadRepository,
		@inject(REPOSITORIES_TYPES.CustomerWriteRepository)
		customerWriteRepository: ICustomerWriteRepository
	) {
		this._outputPort = new NewCustomerPresenter();
		this._customerReadRepository = customerReadRepository;
		this._customerWriteRepository = customerWriteRepository;
	}

	setOutputPort(outputPort: INewCustomerOutputPort): void {
		this._outputPort = outputPort;
	}

	@LogTransaction
	async execute(
		transactionId: string,
		request: INewCustomerCommand
	): Promise<void> {
		const emailOrError = Email.create(request.email, false);
		const phoneOrError = Phone.create(request.phone, false);
		const nameOrError = Name.create(request.firstname, request.lastname);

		const dtoResult = Result.combine([emailOrError, phoneOrError, nameOrError]);

		if (dtoResult.isFailure) {
			this._outputPort.invalid(dtoResult.error);
			return;
		}

		const email = emailOrError.getValue();
		const phone = phoneOrError.getValue();
		const name = nameOrError.getValue();

		const customerDuplicatedResult = await this._customerReadRepository.getByEmailAndPhone(
			email,
			phone
		);

		if (customerDuplicatedResult.length > 0) {
			this._outputPort.duplicate(
				new Error('email or phone number already exist!')
			);
			return;
		}

		const newCustomer = Customer.create({
			name,
			email,
			phone,
		});

		await this._customerWriteRepository.create(newCustomer);

		this._outputPort.created(newCustomer);
	}
}
