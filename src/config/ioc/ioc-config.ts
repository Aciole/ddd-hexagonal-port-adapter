import { Container } from 'inversify';

import USE_CASE_TYPES from '../../modules/domain/use-case/v1/types';

import {
	ICustomerReadRepository,
	ICustomerWriteRepository,
	types as REPOSITORIES_TYPES,
} from '../../modules/domain/repository';

import { CustomerReadMockRepository } from '../../modules/Infrastructure/data-access/repositories/customer-read.mock.repository';
import { CustomerWriteMockRepository } from '../../modules/Infrastructure/data-access/repositories/customer-write.mock.repository';

import { INewCustomerUseCase } from '../../modules/domain/use-case/v1/new-customer/new-customer.usecase';
import { NewCustomerUseCase } from '../../modules/application/use-cases/v1/new-customer/new-customer.use-case';

import { IDeleteCustomerUseCase } from '../../modules/domain/use-case/v1/delete-customer/delete-customer.usecase';
import { DeleteCustomerUseCase } from '../../modules/application/use-cases/v1/delete-customer/delete-customer.use-case';

import { IChangeEmailCustomerUseCase } from '../../modules/domain/use-case/v1/change-email/change-email-customer.usecase';
import { ChangeEmailCustomerUseCase } from '../../modules/application/use-cases/v1/change-email-customer/change-email-customer.use-case';

import { IChangePhoneCustomerUseCase } from '../../modules/domain/use-case/v1/change-phone/change-phone-customer.usecase';
import { ChangePhoneCustomerUseCase } from '../../modules/application/use-cases/v1/change-phone-customer/change-phone-customer.use-case';

import { IChangeNameCustomerUseCase } from '../../modules/domain/use-case/v1/change-name/change-name-customer.usecase';
import { ChangeNameCustomerUseCase } from '../../modules/application/use-cases/v1/change-name-customer/change-name-customer.use-case';

import { IVerifyEmailCustomerUseCase } from '../../modules/domain/use-case/v1/verify-email/verify-email-customer.usecase';
import { VerifyEmailCustomerUseCase } from '../../modules/application/use-cases/v1/verify-email-customer/verify-email-customer.use-case';

import { IVerifyPhoneCustomerUseCase } from '../../modules/domain/use-case/v1/verify-phone/verify-phone-customer.usecase';
import { VerifyPhoneCustomerUseCase } from '../../modules/application/use-cases/v1/verify-phone-customer/verify-phone-customer.use-case';

var container = new Container();

container
	.bind<INewCustomerUseCase>(USE_CASE_TYPES.NewCustomerUseCase)
	.to(NewCustomerUseCase);

container
	.bind<IDeleteCustomerUseCase>(USE_CASE_TYPES.DeleteCustomerUseCase)
	.to(DeleteCustomerUseCase);

container
	.bind<IChangeEmailCustomerUseCase>(USE_CASE_TYPES.ChangeEmailCustomerUseCase)
	.to(ChangeEmailCustomerUseCase);

container
	.bind<IChangePhoneCustomerUseCase>(USE_CASE_TYPES.ChangePhoneCustomerUseCase)
	.to(ChangePhoneCustomerUseCase);

container
	.bind<IChangeNameCustomerUseCase>(USE_CASE_TYPES.ChangeNameCustomerUseCase)
	.to(ChangeNameCustomerUseCase);

container
	.bind<IVerifyEmailCustomerUseCase>(USE_CASE_TYPES.VerifyEmailCustomerUseCase)
	.to(VerifyEmailCustomerUseCase);

container
	.bind<IVerifyPhoneCustomerUseCase>(USE_CASE_TYPES.VerifyPhoneCustomerUseCase)
	.to(VerifyPhoneCustomerUseCase);

// repository
container
	.bind<ICustomerReadRepository>(REPOSITORIES_TYPES.CustomerReadRepository)
	.to(CustomerReadMockRepository);

container
	.bind<ICustomerWriteRepository>(REPOSITORIES_TYPES.CustomerWriteRepository)
	.to(CustomerWriteMockRepository);

export default container;
