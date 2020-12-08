import { Container } from 'inversify';

import USE_CASE_TYPES from '../../modules/domain/interfaces/use-case/types';
import REPOSITORIES_TYPES from '../../modules/domain/interfaces/repository/types';

import { ICustomerReadRepository } from '../../modules/domain/interfaces/repository/customer-read.repository';
import { ICustomerWriteRepository } from '../../modules/domain/interfaces/repository/customer-write.repository';
import { NewCustomerUseCase } from '../../modules/application/use-cases/new-customer/new-customer.use-case';
import { INewCustomerUseCase } from '../../modules/domain/interfaces/use-case/new-customer';
import { IDeleteCustomerUseCase } from '../../modules/domain/interfaces/use-case/delete-customer';
import { DeleteCustomerUseCase } from '../../modules/application/use-cases/delete-customer/delete-customer.use-case';
import { IChangeEmailCustomerUseCase } from '../../modules/domain/interfaces/use-case/change-email-customer';
import { ChangeEmailCustomerUseCase } from '../../modules/application/use-cases/change-email-customer/change-email-customer.use-case';
import { IChangePhoneCustomerUseCase } from '../../modules/domain/interfaces/use-case/change-phone-customer';
import { ChangePhoneCustomerUseCase } from '../../modules/application/use-cases/change-phone-customer/change-phone-customer.use-case';
import { IChangeNameCustomerUseCase } from '../../modules/domain/interfaces/use-case/change-name-customer';
import { ChangeNameCustomerUseCase } from '../../modules/application/use-cases/change-name-customer/change-name-customer.use-case';
import { IVerifyEmailCustomerUseCase } from '../../modules/domain/interfaces/use-case/verify-email.customer';
import { VerifyEmailCustomerUseCase } from '../../modules/application/use-cases/verify-email-customer/verify-email-customer.use-case';
import { IVerifyPhoneCustomerUseCase } from '../../modules/domain/interfaces/use-case/verify-phone.customer';
import { VerifyPhoneCustomerUseCase } from '../../modules/application/use-cases/verify-phone-customer/verify-phone-customer.use-case';
import { CustomerReadMockRepository } from '../../modules/Infrastructure/data-access/repositories/customer-read.mock.repository';
import { CustomerWriteMockRepository } from '../../modules/Infrastructure/data-access/repositories/customer-write.mock.repository';

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

container
	.bind<ICustomerReadRepository>(REPOSITORIES_TYPES.CustomerReadRepository)
	.to(CustomerReadMockRepository);

container
	.bind<ICustomerWriteRepository>(REPOSITORIES_TYPES.CustomerWriteRepository)
	.to(CustomerWriteMockRepository);

export default container;
