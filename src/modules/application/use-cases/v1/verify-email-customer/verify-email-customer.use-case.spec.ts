import { Mock, It } from 'moq.ts';
import 'reflect-metadata';
import { Customer } from '../../../../domain/customer';
import {
	ICustomerReadRepository,
	ICustomerWriteRepository,
} from '../../../../domain/repository';
import { IVerifyEmailCustomerUseCase } from '../../../../domain/use-case/v1/verify-email';
import { Email, Name, Phone } from '../../../../domain/value-objets';
import { VerifyEmailCustomerPresenter } from './verify-email-customer.presenter';
import { VerifyEmailCustomerUseCase } from './verify-email-customer.use-case';

describe('The VerifyEmailCustomerUseCase', () => {
	let outputPort: VerifyEmailCustomerPresenter;
	let readRepository = new Mock<ICustomerReadRepository>();
	let writeRepository = new Mock<ICustomerWriteRepository>();
	let useCase: IVerifyEmailCustomerUseCase;
	let customer: Customer;

	it('should return "invalid" given Email format invalid.', async () => {
		useCase = new VerifyEmailCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new VerifyEmailCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			email: 'aciole.com',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.invalidOutputPort);

		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.alreadyBeenVerifiedOutputPort);
		expect(false).toBe(outputPort.verifiedOutputPort);
	});

	it('should return "notFound" given Id not found.', async () => {
		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		useCase = new VerifyEmailCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new VerifyEmailCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			email: 'aciole@gmail.com',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.notFoundOutputPort);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.doesNotBelongToThisCustomerPort);
		expect(false).toBe(outputPort.alreadyBeenVerifiedOutputPort);
		expect(false).toBe(outputPort.verifiedOutputPort);
	});

	it('should return "doesNotBelongToThisCustomer" given PhoneNumber not registed.', async () => {
		customer = Customer.create({
			name: Name.create('Aciole', 'Carmo').getValue(),
			email: Email.create('aciolecarmo@gmail.com', true, new Date()).getValue(),
			phone: Phone.create('5511999999999', true, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		useCase = new VerifyEmailCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new VerifyEmailCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			email: 'aciole@gmail.com',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.doesNotBelongToThisCustomerPort);

		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.alreadyBeenVerifiedOutputPort);
		expect(false).toBe(outputPort.verifiedOutputPort);
	});

	it('should return "alreadyBeenVerified" given Id not found.', async () => {
		customer = Customer.create({
			name: Name.create('Aciole', 'Carmo').getValue(),
			email: Email.create('aciolecarmo@gmail.com', true, new Date()).getValue(),
			phone: Phone.create('5511999999999', true, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		useCase = new VerifyEmailCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new VerifyEmailCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			email: 'aciolecarmo@gmail.com',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.alreadyBeenVerifiedOutputPort);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.doesNotBelongToThisCustomerPort);
		expect(false).toBe(outputPort.verifiedOutputPort);
	});

	it('should return "alreadyBeenVerified" given Id not found.', async () => {
		customer = Customer.create({
			name: Name.create('Aciole', 'Carmo').getValue(),
			email: Email.create(
				'aciolecarmo@gmail.com',
				false,
				new Date()
			).getValue(),
			phone: Phone.create('5511999999999', false, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		writeRepository
			.setup((instance) => instance.update(It.IsAny()))
			.returns(new Promise((resolve) => resolve()));

		useCase = new VerifyEmailCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new VerifyEmailCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			email: 'aciolecarmo@gmail.com',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.verifiedOutputPort);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.doesNotBelongToThisCustomerPort);
		expect(false).toBe(outputPort.alreadyBeenVerifiedOutputPort);
	});
});
