import { Mock, It } from 'moq.ts';
import 'reflect-metadata';
import {
	ICustomerReadRepository,
	ICustomerWriteRepository,
} from '../../../../domain/repository';
import { IChangeNameCustomerUseCase } from '../../../../domain/use-case/v1/change-name';
import { ChangeNameCustomerPresenter } from './change-name-customer.presenter';
import { ChangeNameCustomerUseCase } from './change-name-customer.use-case';

import { Customer } from '../../../../domain/customer';
import { Email, Name, Phone } from '../../../../domain/value-objets';

describe('The ChangeNameCustomerUseCase', () => {
	let outputPort: ChangeNameCustomerPresenter;
	let readRepository = new Mock<ICustomerReadRepository>();
	let writeRepository = new Mock<ICustomerWriteRepository>();
	let useCase: IChangeNameCustomerUseCase;
	let customer: Customer;

	it('should return "invalid" given Name format invalid.', async () => {
		useCase = new ChangeNameCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new ChangeNameCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: '',
			firstname: 'a',
			lastname: 'a',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.invalidOutputPort);

		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.unchangedOutputPort);
		expect(false).toBe(outputPort.changedOutputPort);
	});

	it('should return "notFound" given customerId inexistente.', async () => {
		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		useCase = new ChangeNameCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new ChangeNameCustomerPresenter();
		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			firstname: 'Aciole',
			lastname: 'Carmo',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.notFoundOutputPort);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.unchangedOutputPort);
		expect(false).toBe(outputPort.changedOutputPort);
	});

	it('should return "unchanged" given Name is unchanged.', async () => {
		customer = Customer.create({
			name: Name.create('Aciole', 'Carmo').getValue(),
			email: Email.create('aciolecarmo@gmail.com', true, new Date()).getValue(),
			phone: Phone.create('5511959390747', true, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		useCase = new ChangeNameCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new ChangeNameCustomerPresenter();
		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			firstname: 'Aciole',
			lastname: 'Carmo',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.unchangedOutputPort);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.changedOutputPort);
	});

	it('should return "changed" given Name was valid.', async () => {
		customer = Customer.create({
			name: Name.create('Aciole', 'Carmo').getValue(),
			email: Email.create('aciolecarmo@gmail.com', true, new Date()).getValue(),
			phone: Phone.create('5511959390747', true, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		writeRepository
			.setup((instance) => instance.update(It.IsAny()))
			.returns(new Promise((resolve) => resolve()));

		useCase = new ChangeNameCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new ChangeNameCustomerPresenter();
		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			firstname: 'Aciole',
			lastname: 'do Carmo',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.changedOutputPort);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.unchangedOutputPort);
	});
});
