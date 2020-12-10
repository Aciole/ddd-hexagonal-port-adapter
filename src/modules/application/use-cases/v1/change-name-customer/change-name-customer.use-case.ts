import { injectable, inject } from 'inversify';
import {
	ICustomerReadRepository,
	ICustomerWriteRepository,
	types as REPOSITORIES_TYPES,
} from '../../../../domain/repository';

import {
	IChangeNameCustomerUseCase,
	IChangeNameCustomerCommand,
	IChangeNameCustomerOutputPort,
} from '../../../../domain/use-case/v1/change-name';

import { CustomerId, Name } from '../../../../domain/value-objets';
import { ChangeNameCustomerPresenter } from './change-name-customer.presenter';
import { Loggable, LogTransaction } from '../../../../../shared/decorators/log';

@Loggable()
@injectable()
export class ChangeNameCustomerUseCase implements IChangeNameCustomerUseCase {
	private _outputPort: IChangeNameCustomerOutputPort;
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

	setOutputPort(outputPort: IChangeNameCustomerOutputPort): void {
		this._outputPort = outputPort;
	}

	@LogTransaction
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
