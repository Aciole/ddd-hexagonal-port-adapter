import { Mock, It } from 'moq.ts';
import 'reflect-metadata';
import { Customer } from '../../../../domain/customer';
import { ICustomerReadRepository } from '../../../../domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../../../domain/interfaces/repository/customer-write.repository';
import { IVerifyPhoneCustomerUseCase } from '../../../../domain/use-case/v1/verify-phone/verify-phone.customer.usecase';
import { Email } from '../../../../domain/value-objets/email';
import { Name } from '../../../../domain/value-objets/name';
import { Phone } from '../../../../domain/value-objets/phone';
import { VerifyPhoneCustomerPresenter } from './verify-phone-customer.presenter';
import { VerifyPhoneCustomerUseCase } from './verify-phone-customer.use-case';

describe('The VerifyPhoneCustomerUseCase', () => {
	let outputPort: VerifyPhoneCustomerPresenter;
	let readRepository = new Mock<ICustomerReadRepository>();
	let writeRepository = new Mock<ICustomerWriteRepository>();
	let useCase: IVerifyPhoneCustomerUseCase;
	let customer: Customer;

	it('should return "invalid" given Phone format invalid.', async () => {
		useCase = new VerifyPhoneCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new VerifyPhoneCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			phone: 'onze999999999',
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

		useCase = new VerifyPhoneCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new VerifyPhoneCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			phone: '5511999999999',
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

		useCase = new VerifyPhoneCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new VerifyPhoneCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			phone: '551199998888',
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

		useCase = new VerifyPhoneCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new VerifyPhoneCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			phone: '5511999999999',
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
			email: Email.create('aciolecarmo@gmail.com', true, new Date()).getValue(),
			phone: Phone.create('5511999999999', false, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		writeRepository
			.setup((instance) => instance.update(It.IsAny()))
			.returns(new Promise((resolve) => resolve()));

		useCase = new VerifyPhoneCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new VerifyPhoneCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: '1',
			phone: '5511999999999',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.verifiedOutputPort);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.doesNotBelongToThisCustomerPort);
		expect(false).toBe(outputPort.alreadyBeenVerifiedOutputPort);
	});
});
