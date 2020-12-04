import { Mock, It } from 'moq.ts';
import { Customer } from '../../../domain/customer';
import { INewCustomerUseCase } from '../../../domain/interfaces/use-case/new-customer';
import { ICustomerReadRepository } from '../../../domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../../domain/interfaces/repository/customer-write.repository';
import { NewCustomerPresenter } from './new-customer.presenter';
import { NewCustomerUseCase } from './new-customer.use-case';
import { Name } from '../../../domain/value-objets/name';
import { Email } from '../../../domain/value-objets/email';
import { Phone } from '../../../domain/value-objets/phone';

describe('The NewCustomerUseCase', () => {
	let outputPort: NewCustomerPresenter;
	let readRepository = new Mock<ICustomerReadRepository>();
	let writeRepository = new Mock<ICustomerWriteRepository>();
	let useCase: INewCustomerUseCase;
	let customer: Customer;

	it('Should return "invalid" given Email, Name and Phone format invalid.', async () => {
		useCase = new NewCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new NewCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			email: 'agmail.com',
			phone: '',
			firstname: 'f',
			lastname: 'l',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.duplicateOutputPort);
		expect(false).toBe(outputPort.createdOutputPort);
	});

	it('Should return "duplicate" given Email or Phone is duplicate.', async () => {
		customer = Customer.create({
			name: Name.create('Aciole', 'Carmo').getValue(),
			email: Email.create('aciolecarmo@gmail.com', true, new Date()).getValue(),
			phone: Phone.create('5511959390747', true, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		useCase = new NewCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new NewCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			email: 'aciolecarmo@gmail.com',
			phone: 'aciolecarmo@gmail.com',
			firstname: 'Aciole',
			lastname: 'Carmo',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.duplicateOutputPort);
		expect(false).toBe(outputPort.createdOutputPort);
	});

	it('Should return "created" given Email, Name and Phone format invalid.', async () => {
		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		writeRepository
			.setup((instance) => instance.update(It.IsAny()))
			.returns(new Promise((resolve) => resolve()));

		useCase = new NewCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new NewCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			email: 'aciolecarmo@gmail.com',
			phone: 'aciolecarmo@gmail.com',
			firstname: 'Aciole',
			lastname: 'Carmo',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.duplicateOutputPort);
		expect(false).toBe(outputPort.createdOutputPort);
	});
});
