import { Mock, It } from 'moq.ts';
import 'reflect-metadata';

import { ChangeEmailCustomerUseCase } from './change-email-customer.use-case';
import { ChangeEmailCustomerPresenter } from './change-email-customer.presenter';

import { Customer } from '../../../../domain/customer';
import { Email, Name, Phone } from '../../../../domain/value-objets';
import {
	ICustomerReadRepository,
	ICustomerWriteRepository,
} from '../../../../domain/repository';
import { IChangeEmailCustomerUseCase } from '../../../../domain/use-case/v1/change-email/change-email-customer.usecase';

describe('The ChangeEmailCustomerUseCase', () => {
	let outputPort: ChangeEmailCustomerPresenter;
	let readRepository = new Mock<ICustomerReadRepository>();
	let writeRepository = new Mock<ICustomerWriteRepository>();
	let useCase: IChangeEmailCustomerUseCase;
	let customer: Customer;

	it('should return "invalid" given Email format invalid.', async () => {
		useCase = new ChangeEmailCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new ChangeEmailCustomerPresenter();

		useCase.setOutputPort(outputPort);

		await useCase.execute(`transaction-id:${Math.random()}`, {
			id: '13',
			email: 'aciolecarmo.com',
		});

		expect(true).toBe(outputPort.invalidOutputPort);

		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.unchangedOutputPort);
		expect(false).toBe(outputPort.changedOutputPort);
	});

	it('should return "notFound" given customerId inexistente.', async () => {
		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		useCase = new ChangeEmailCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new ChangeEmailCustomerPresenter();
		useCase.setOutputPort(outputPort);

		const command = {
			id: `${Math.random()}`,
			email: 'aciolecarmo@gmail.com',
		};
		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.notFoundOutputPort);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.unchangedOutputPort);
		expect(false).toBe(outputPort.changedOutputPort);
	});

	it('should return "unchanged" given Email is unchanged.', async () => {
		customer = Customer.create({
			name: Name.create('Aciole', 'Campo').getValue(),
			email: Email.create('aciolecarmo@gmail.com', true, new Date()).getValue(),
			phone: Phone.create('551199999999', true, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		useCase = new ChangeEmailCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new ChangeEmailCustomerPresenter();
		useCase.setOutputPort(outputPort);

		const command = {
			id: `${Math.random()}`,
			email: 'aciolecarmo@gmail.com',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.unchangedOutputPort);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.changedOutputPort);
	});

	it('should return "changed" given Email was valid.', async () => {
		customer = Customer.create({
			name: Name.create('Aciole', 'Campo').getValue(),
			email: Email.create('aciolecarmo@gmail.com', true, new Date()).getValue(),
			phone: Phone.create('551199999999', true, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		writeRepository
			.setup((instance) => instance.update(It.IsAny()))
			.returns(new Promise((resolve) => resolve()));

		useCase = new ChangeEmailCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new ChangeEmailCustomerPresenter();
		useCase.setOutputPort(outputPort);

		const command = {
			id: `${Math.random()}`,
			email: 'aciolecarmo1@gmail.com',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.changedOutputPort);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.unchangedOutputPort);
	});
});
