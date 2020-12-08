import { ICustomerReadRepository } from '../../../domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../../domain/interfaces/repository/customer-write.repository';
import {
	IChangeNameCustomerUseCase,
	IOutputPort,
} from '../../../domain/interfaces/use-case/change-name-customer';
import { IChangeNameCustomerCommand } from '../../../domain/interfaces/commands/change-name-customer.command';
import { CustomerId } from '../../../domain/value-objets/customer-id';
import { Name } from '../../../domain/value-objets/name';
import { ChangeNameCustomerPresenter } from './change-name-customer.presenter';

import { injectable, inject } from 'inversify';
import REPOSITORIES_TYPES from '../../../domain/interfaces/repository/types';
@injectable()
export class ChangeNameCustomerUseCase implements IChangeNameCustomerUseCase {
	private _outputPort: IOutputPort;
	private readonly _customerReadRepository: ICustomerReadRepository;
	private readonly _customerWriteRepository: ICustomerWriteRepository;

	constructor(
		@inject(REPOSITORIES_TYPES.CustomerReadRepository)
		customerReadRepository: ICustomerReadRepository,
		@inject(REPOSITORIES_TYPES.CustomerWriteRepository)
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

		if (
			customerResult.name.firstname === request.firstname &&
			customerResult.name.lastname === request.lastname
		) {
			this._outputPort.unchanged(new Error(''));
			return;
		}

		customerResult.updateName(nameUpdated);

		await this._customerWriteRepository.update(customerResult);

		this._outputPort.changed(customerResult);
	}
}
