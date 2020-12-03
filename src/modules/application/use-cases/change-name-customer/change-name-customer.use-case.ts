import { ICustomerReadRepository } from '@domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '@domain/interfaces/repository/customer-write.repository';
import {
	IChangeNameCustomerCommand,
	IChangeNameCustomerUseCase,
	IOutputPort,
} from '@domain/interfaces/use-case/change-name-customer';
import { CustomerId } from '@domain/value-objets/customer-id';
import { Name } from '@domain/value-objets/name';
import { ChangeNameCustomerPresenter } from './change-name-customer.presenter';

export class ChangeNameCustomerUseCase implements IChangeNameCustomerUseCase {
	private _outputPort: IOutputPort;
	private readonly _customerReadRepository: ICustomerReadRepository;
	private readonly _customerWriteRepository: ICustomerWriteRepository;

	constructor(
		customerReadRepository: ICustomerReadRepository,
		customerWriteRepository: ICustomerWriteRepository
	) {
		this._outputPort = new ChangeNameCustomerPresenter();
		this._customerReadRepository = customerReadRepository;
		this._customerWriteRepository = customerWriteRepository;
	}

	setOutputPort(outputPort: IOutputPort): void {
		this._outputPort = outputPort;
	}

	async execute(
		transactionId: string,
		request: IChangeNameCustomerCommand
	): Promise<void> {
		const nameOrError = Name.create(request.firstname, request.lastname);

		if (nameOrError.isFailure) {
			this._outputPort.invalid(new Error(''));
			return;
		}

		const nameUpdated = nameOrError.getValue();

		const customerResult = await this._customerReadRepository.getById(
			CustomerId.create({ id: request.id })
		);

		if (customerResult == null) {
			this._outputPort.notFound(new Error(''));
			return;
		}

		customerResult.updateName(nameUpdated);

		await this._customerWriteRepository.update(customerResult);

		this._outputPort.changed(customerResult);
	}
}
