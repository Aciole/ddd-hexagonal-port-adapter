import { Mock, It } from 'moq.ts';
import 'reflect-metadata';
import { Customer } from '../../../../domain/customer';
import { INewCustomerUseCase } from '../../../../domain/use-case/v1/new-customer';
import {
	ICustomerReadRepository,
	ICustomerWriteRepository,
} from '../../../../domain/repository';
import { NewCustomerPresenter } from './new-customer.presenter';
import { NewCustomerUseCase } from './new-customer.use-case';
import { Email, Name, Phone } from '../../../../domain/value-objets';

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
			phone: Phone.create('5511999999999', true, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getByEmailAndPhone(It.IsAny(), It.IsAny()))
			.returns(new Promise((resolve) => resolve([customer])));

		useCase = new NewCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new NewCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			email: 'aciolecarmo@gmail.com',
			phone: '5511999999999',
			firstname: 'Aciole',
			lastname: 'Carmo',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.duplicateOutputPort);
		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.createdOutputPort);
	});

	it('Should return "created" given Email, Name and Phone format invalid.', async () => {
		readRepository
			.setup((instance) => instance.getByEmailAndPhone(It.IsAny(), It.IsAny()))
			.returns(new Promise((resolve) => resolve([])));

		writeRepository
			.setup((instance) => instance.create(It.IsAny()))
			.returns(new Promise((resolve) => resolve()));

		useCase = new NewCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new NewCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			email: 'aciolecarmo@gmail.com',
			phone: '5511999999999',
			firstname: 'Aciole',
			lastname: 'Carmo',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.duplicateOutputPort);
		expect(true).toBe(outputPort.createdOutputPort);
	});
});
