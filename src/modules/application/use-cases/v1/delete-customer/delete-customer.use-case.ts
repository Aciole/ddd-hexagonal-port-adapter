import { injectable, inject } from 'inversify';
import {
	ICustomerReadRepository,
	ICustomerWriteRepository,
	types as REPOSITORIES_TYPES,
} from '../../../../domain/repository';
import {
	IDeleteCustomerUseCase,
	IDeleteCustomerOutputPort,
	IDeleteCustomerCommand,
} from '../../../../domain/use-case/v1/delete-customer';
import { CustomerId } from '../../../../domain/value-objets';
import { DeleteCustomerPresenter } from './delete-customer.presenter';
import { Loggable, LogTransaction } from '../../../../../shared/decorators/log';

@Loggable()
@injectable()
export class DeleteCustomerUseCase implements IDeleteCustomerUseCase {
	private _outputPort: IDeleteCustomerOutputPort;
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

	setOutputPort(outputPort: IDeleteCustomerOutputPort): void {
		this._outputPort = outputPort;
	}

	@LogTransaction
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
