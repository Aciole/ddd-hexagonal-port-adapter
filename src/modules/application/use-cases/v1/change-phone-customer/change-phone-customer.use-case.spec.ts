import { Mock, It } from 'moq.ts';
import 'reflect-metadata';
import { ICustomerReadRepository } from '../../../../domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../../../domain/interfaces/repository/customer-write.repository';
import { IChangePhoneCustomerUseCase } from '../../../../domain/use-case/v1/change-phone/change-phone-customer.usecase';
import { ChangePhoneCustomerUseCase } from './change-phone-customer.use-case';
import { ChangePhoneCustomerPresenter } from './change-phone-customer.presenter';

import { Customer } from '../../../../domain/customer';
import { Name } from '../../../../domain/value-objets/name';
import { Email } from '../../../../domain/value-objets/email';
import { Phone } from '../../../../domain/value-objets/phone';

describe('The ChangePhoneCustomerUseCase', () => {
	let outputPort: ChangePhoneCustomerPresenter;
	let readRepository = new Mock<ICustomerReadRepository>();
	let writeRepository = new Mock<ICustomerWriteRepository>();
	let useCase: IChangePhoneCustomerUseCase;
	let customer: Customer;

	it('should return "invalid" given Email format invalid.', async () => {
		useCase = new ChangePhoneCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new ChangePhoneCustomerPresenter();

		useCase.setOutputPort(outputPort);

		await useCase.execute(`transaction-id:${Math.random()}`, {
			id: '1',
			phone: 'onze999999999',
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

		useCase = new ChangePhoneCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);

		outputPort = new ChangePhoneCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: `${Math.random()}`,
			phone: '5511999999999',
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
			phone: Phone.create('5511959390747', true, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		useCase = new ChangePhoneCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new ChangePhoneCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: `${Math.random()}`,
			phone: '5511959390747',
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
			phone: Phone.create('5511959390747', true, new Date()).getValue(),
		});

		readRepository
			.setup((instance) => instance.getById(It.IsAny()))
			.returns(new Promise((resolve) => resolve(customer)));

		writeRepository
			.setup((instance) => instance.update(It.IsAny()))
			.returns(new Promise((resolve) => resolve()));

		useCase = new ChangePhoneCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
		outputPort = new ChangePhoneCustomerPresenter();

		useCase.setOutputPort(outputPort);

		const command = {
			id: `${Math.random()}`,
			phone: '5511959390799',
		};

		await useCase.execute(`transaction-id:${Math.random()}`, command);

		expect(true).toBe(outputPort.changedOutputPort);

		expect(false).toBe(outputPort.invalidOutputPort);
		expect(false).toBe(outputPort.notFoundOutputPort);
		expect(false).toBe(outputPort.unchangedOutputPort);
	});
});
