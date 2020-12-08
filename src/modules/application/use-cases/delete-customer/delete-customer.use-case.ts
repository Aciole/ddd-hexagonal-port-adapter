import { ICustomerReadRepository } from '../../../domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../../domain/interfaces/repository/customer-write.repository';
import {
	IDeleteCustomerCommand,
	IDeleteCustomerUseCase,
	IOutputPort,
} from '../../../domain/interfaces/use-case/delete-customer';
import { CustomerId } from '../../../domain/value-objets/customer-id';
import { DeleteCustomerPresenter } from './delete-customer.presenter';

import { injectable, inject } from 'inversify';
import REPOSITORIES_TYPES from '../../../domain/interfaces/repository/types';

@injectable()
export class DeleteCustomerUseCase implements IDeleteCustomerUseCase {
	private _outputPort: IOutputPort;
	private readonly _customerReadRepository: ICustomerReadRepository;
	private readonly _customerWriteRepository: ICustomerWriteRepository;

	constructor(
		@inject(REPOSITORIES_TYPES.CustomerReadRepository)
		customerReadRepository: ICustomerReadRepository,
		@inject(REPOSITORIES_TYPES.CustomerWriteRepository)
		customerWriteRepository: ICustomerWriteRepository
	) {
		this._outputPort = new DeleteCustomerPresenter();
		this._customerReadRepository = customerReadRepository;
		this._customerWriteRepository = customerWriteRepository;
	}

	setOutputPort(outputPort: IOutputPort): void {
		this._outputPort = outputPort;
	}

	async execute(
		transactionId: string,
		request: IDeleteCustomerCommand
	): Promise<void> {
		const customerResult = await this._customerReadRepository.getById(
			CustomerId.create({ id: request.id })
		);

		if (customerResult == null) {
			this._outputPort.notFound();
			return;
		}

		await this._customerWriteRepository.delete(customerResult);

		this._outputPort.deleted();
	}
}
