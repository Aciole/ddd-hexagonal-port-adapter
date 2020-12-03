import { Mock, It, Times } from 'moq.ts';
import { ICustomerReadRepository } from '@domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '@domain/interfaces/repository/customer-write.repository';
import { IChangeEmailCustomerUseCase } from '@domain/interfaces/use-case/change-email-customer';
import { ChangeEmailCustomerUseCase } from './change-email-customer.use-case';
import { ChangeEmailCustomerPresenter } from './change-email-customer.presenter';
// import { Customer } from '@domain/customer';
// import { Name } from '@domain/value-objets/name';
// import { Email } from '@domain/value-objets/email';
// import { Phone } from '@domain/value-objets/phone';

describe('The ChangeEmailCustomerUseCase', () => {
	let outputPort = new ChangeEmailCustomerPresenter();
	let readRepository = new Mock<ICustomerReadRepository>();
	let writeRepository = new Mock<ICustomerWriteRepository>();
	let useCase: IChangeEmailCustomerUseCase;

	it('should return "invalid" given Email format invalid.', async () => {
		useCase = new ChangeEmailCustomerUseCase(
			readRepository.object(),
			writeRepository.object()
		);
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
	// it('should return "notFound" given customerId inexistente.', () => {
	// 	readRepository
	// 		.setup((instance) => instance.getById(It.IsAny()))
	// 		.returns(new Promise((resolve) => resolve()));

	// 	useCase = new ChangeEmailCustomerUseCase(
	// 		readRepository.object(),
	// 		writeRepository.object()
	// 	);
	// 	useCase.setOutputPort(outputPort);

	// 	useCase.execute(`transaction-id:${Math.random()}`, {
	// 		id: `${Math.random()}`,
	// 		email: 'aciolecarmo@gmail.com',
	// 	});

	// 	expect(false).toBe(outputPort.invalidOutputPort);
	// 	expect(true).toBe(outputPort.notFoundOutputPort);
	// 	expect(false).toBe(outputPort.unchangedOutputPort);
	// 	expect(false).toBe(outputPort.changedOutputPort);
	// });
	// it('should return "unchanged" given Email is unchanged.', () => {
	// 	readRepository
	// 		.setup((instance) => instance.getById(It.IsAny()))
	// 		.returns(
	// 			new Promise((resolve) =>
	// 				resolve(
	// 					Customer.create({
	// 						name: Name.create('Aciole', 'Campo').getValue(),
	// 						email: Email.create(
	// 							'aciolecarmo@gmail.com',
	// 							true,
	// 							new Date()
	// 						).getValue(),
	// 						phone: Phone.create('5511959390747', true, new Date()).getValue(),
	// 					})
	// 				)
	// 			)
	// 		);

	// 	useCase = new ChangeEmailCustomerUseCase(
	// 		readRepository.object(),
	// 		writeRepository.object()
	// 	);
	// 	useCase.setOutputPort(outputPort);

	// 	useCase.execute(`transaction-id:${Math.random()}`, {
	// 		id: `${Math.random()}`,
	// 		email: 'aciolecarmo@gmail.com',
	// 	});

	// 	expect(false).toBe(outputPort.invalidOutputPort);
	// 	expect(false).toBe(outputPort.notFoundOutputPort);
	// 	expect(true).toBe(outputPort.unchangedOutputPort);
	// 	expect(false).toBe(outputPort.changedOutputPort);
	// });
	// it('should return "changed" given Email was valid.', () => {
	// 	useCase = new ChangeEmailCustomerUseCase(
	// 		readRepository.object(),
	// 		writeRepository.object()
	// 	);
	// 	useCase.setOutputPort(outputPort);

	// 	useCase.execute(`transaction-id:${Math.random()}`, {
	// 		id: `${Math.random()}`,
	// 		email: 'aciolecarmo@gmail.com',
	// 	});

	// 	expect(false).toBe(outputPort.invalidOutputPort);
	// 	expect(false).toBe(outputPort.notFoundOutputPort);
	// 	expect(false).toBe(outputPort.unchangedOutputPort);
	// 	expect(true).toBe(outputPort.changedOutputPort);
	// });
});
