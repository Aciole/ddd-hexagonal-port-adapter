import { NewCustomerPresenter } from './new-customer.presenter';
import { Result } from '../../../../shared/core/result';
import {
	INewCustomerCommand,
	INewCustomerUseCase,
	IOutputPort,
} from '../../../domain/interfaces/use-case/new-customer';
import { Email } from '../../../domain/value-objets/email';
import { Phone } from '../../../domain/value-objets/phone';
import { Name } from '../../../domain/value-objets/name';
import { Customer } from '../../../domain/customer';
import { ICustomerReadRepository } from '../../../domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../../domain/interfaces/repository/customer-write.repository';

export class NewCustomerUseCase implements INewCustomerUseCase {
	private _outputPort: IOutputPort;
	private readonly _customerReadRepository: ICustomerReadRepository;
	private readonly _customerWriteRepository: ICustomerWriteRepository;

	constructor(
		customerReadRepository: ICustomerReadRepository,
		customerWriteRepository: ICustomerWriteRepository
	) {
		this._outputPort = new NewCustomerPresenter();
		this._customerReadRepository = customerReadRepository;
		this._customerWriteRepository = customerWriteRepository;
	}

	setOutputPort(outputPort: IOutputPort): void {
		this._outputPort = outputPort;
	}

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
