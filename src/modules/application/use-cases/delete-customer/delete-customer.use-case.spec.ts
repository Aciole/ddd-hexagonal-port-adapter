import { Mock, It } from 'moq.ts';
import { Customer } from '../../../domain/customer';
import { ICustomerReadRepository } from '../../../domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../../domain/interfaces/repository/customer-write.repository';
import { IDeleteCustomerUseCase } from '../../../domain/interfaces/use-case/delete-customer';
import { Email } from '../../../domain/value-objets/email';
import { Name } from '../../../domain/value-objets/name';
import { Phone } from '../../../domain/value-objets/phone';
import { DeleteCustomerPresenter } from './delete-customer.presenter';
import { DeleteCustomerUseCase } from './delete-customer.use-case';

describe('The DeleteCustomerUseCase', () => {
	let outputPort: DeleteCustomerPresenter;
	let readRepository = new Mock<ICustomerReadRepository>();
	let writeRepository = new Mock<ICustomerWriteRepository>();
	let useCase: IDeleteCustomerUseCase;
	let customer: Customer;

	it('Should return "notFound" ', async () => {
		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		useCase = new DeleteCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new DeleteCustomerPresenter();

		useCase.setOutputPort(outputPort);

		await useCase.execute(`transaction-id:${Math.random()}`, {
			id: '1',
		});

		expect(true).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.deletedOutputPort);
	});

	it('Should return "deleted" ', async () => {
		customer = Customer.create({
			name: Name.create('Aciole', 'Campo').getValue(),
			email: Email.create('aciolecarmo@gmail.com', true, new Date()).getValue(),
			phone: Phone.create('5511959390747', true, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		writeRepository
			.setup((instance) => instance.delete(It.IsAny()))
			.returns(new Promise((resolve) => resolve()));

		useCase = new DeleteCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new DeleteCustomerPresenter();

		useCase.setOutputPort(outputPort);

		await useCase.execute(`transaction-id:${Math.random()}`, {
			id: '1',
		});

		expect(true).toBe(outputPort.deletedOutputPort);
		expect(false).toBe(outputPort.notFoundOutputPort);
	});
});
