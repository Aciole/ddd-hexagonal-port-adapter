import * as express from 'express';
import {
	interfaces,
	controller,
	httpPost,
	httpDelete,
	request,
	response,
	requestParam,
	httpPatch,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import USE_CASE_TYPES from '../../../../../domain/interfaces/use-case/types';
import {
	INewCustomerCommand,
	INewCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/new-customer';
import { NewCustomerAdapter } from './new-customer/new-customer.adpter';
import { DeleteCustomerAdapter } from './delete-customer/delete-customer.adpter';
import {
	IDeleteCustomerCommand,
	IDeleteCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/delete-customer';
import { ChangeEmailCustomerAdapter } from './change-email/change-email-customer.adapter';
import {
	IChangeEmailCustomerCommand,
	IChangeEmailCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/change-email-customer';
import { ChangeNameCustomerAdapter } from './change-name/change-name-customer.adapter';
import {
	IChangeNameCustomerCommand,
	IChangeNameCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/change-name-customer';
import { ChangePhoneCustomerAdapter } from './change-phone/change-phone-customer.adapter';
import {
	IChangePhoneCustomerCommand,
	IChangePhoneCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/change-phone-customer';
import { VerifyEmailCustomerAdapter } from './verify-email-customer/verify-email-customer.adpter';
import {
	IVerifyEmailCustomerCommand,
	IVerifyEmailCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/verify-email.customer';
import { VerifyPhoneCustomerAdapter } from './verify-phone-customer/verify-phone-customer.adpter';
import {
	IVerifyPhoneCustomerCommand,
	IVerifyPhoneCustomerUseCase,
} from '../../../../../domain/interfaces/use-case/verify-phone.customer';
import {
	ApiPath,
	ApiOperationPost,
	ApiOperationDelete,
	ApiOperationPatch,
	SwaggerDefinitionConstant,
} from 'swagger-express-ts';

@ApiPath({
	name: 'customer',
	path: '/customer',
})
@controller('/customer')
export class CustomerController implements interfaces.Controller {
	constructor(
		@inject(USE_CASE_TYPES.NewCustomerUseCase)
		private newCustomerUseCase: INewCustomerUseCase,
		@inject(USE_CASE_TYPES.DeleteCustomerUseCase)
		private deleteCustomerUseCase: IDeleteCustomerUseCase,
		@inject(USE_CASE_TYPES.ChangeEmailCustomerUseCase)
		private changeEmailCustomerUseCase: IChangeEmailCustomerUseCase,
		@inject(USE_CASE_TYPES.ChangeNameCustomerUseCase)
		private changeNameCustomerUseCase: IChangeNameCustomerUseCase,
		@inject(USE_CASE_TYPES.ChangePhoneCustomerUseCase)
		private changePhoneCustomerUseCase: IChangePhoneCustomerUseCase,
		@inject(USE_CASE_TYPES.VerifyEmailCustomerUseCase)
		private verifyEmailCustomerUseCase: IVerifyEmailCustomerUseCase,
		@inject(USE_CASE_TYPES.VerifyPhoneCustomerUseCase)
		private verifyPhoneCustomerUseCase: IVerifyPhoneCustomerUseCase
	) {}

	@ApiOperationPost({
		description: 'Register new Customer',
		summary: 'Register new Customer',
		parameters: {
			body: {
				model: 'CustomerRegister',
				required: true,
			},
		},
		responses: {
			201: { model: 'Customer' },
			400: { description: 'errors' },
			409: { description: 'errors' },
			500: {},
		},
	})
	@httpPost('/')
	private async create(
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new NewCustomerAdapter(response);

		this.newCustomerUseCase.setOutputPort(adapterPort);
		const command: INewCustomerCommand = { ...request.body };

		await this.newCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}
	@ApiOperationDelete({
		description: '',
		summary: '',
		path: '/{id}',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
		},
		responses: {
			202: {},
			400: {},
			404: {},
		},
	})
	@httpDelete('/:id')
	private async delete(
		@requestParam('id') id: string,
		@response() response: express.Response
	) {
		const adapterPort = new DeleteCustomerAdapter(response);

		this.deleteCustomerUseCase.setOutputPort(adapterPort);
		const command: IDeleteCustomerCommand = { id };

		await this.deleteCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}

	@ApiOperationPatch({
		description: '',
		summary: '',
		path: '/{id}/email',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
			body: {
				model: 'ChangeEmail',
				required: true,
			},
		},
		responses: {
			400: {},
			404: {},
			409: {},
			202: {},
		},
	})
	@httpPatch('/:id/email')
	private async changeEmail(
		@requestParam('id') id: string,
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new ChangeEmailCustomerAdapter(response);

		this.changeEmailCustomerUseCase.setOutputPort(adapterPort);
		const command: IChangeEmailCustomerCommand = { ...request.body, id };

		await this.changeEmailCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}

	@ApiOperationPatch({
		description: '',
		summary: '',
		path: '/{id}/name',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
			body: {
				model: 'ChangeName',
				required: true,
			},
		},
		responses: {
			400: {},
			404: {},
			409: {},
			202: {},
		},
	})
	@httpPatch('/:id/name')
	private async changeName(
		@requestParam('id') id: string,
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new ChangeNameCustomerAdapter(response);

		this.changeNameCustomerUseCase.setOutputPort(adapterPort);

		const command: IChangeNameCustomerCommand = { ...request.body, id };

		await this.changeNameCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}

	@ApiOperationPatch({
		description: '',
		summary: '',
		path: '/{id}/phone',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
			body: {
				model: 'ChangePhone',
				required: true,
			},
		},
		responses: {
			400: {},
			404: {},
			409: {},
			202: {},
		},
	})
	@httpPatch('/:id/phone')
	private async changePhone(
		@requestParam('id') id: string,
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new ChangePhoneCustomerAdapter(response);

		this.changePhoneCustomerUseCase.setOutputPort(adapterPort);

		const command: IChangePhoneCustomerCommand = { ...request.body, id };

		await this.changePhoneCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}

	@ApiOperationPatch({
		description: '',
		summary: '',
		path: '/{id}/verify-email',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
			body: {
				model: 'VerifyEmail',
				required: true,
			},
		},
		responses: {
			400: {},
			404: {},
			202: {},
			204: {},
		},
	})
	@httpPatch('/:id/verify-email')
	private async verifyEmail(
		@requestParam('id') id: string,
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new VerifyEmailCustomerAdapter(response);

		this.verifyEmailCustomerUseCase.setOutputPort(adapterPort);
		const command: IVerifyEmailCustomerCommand = { ...request.body, id };

		await this.verifyEmailCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}

	@ApiOperationPatch({
		description: '',
		summary: '',
		path: '/{id}/verify-phone',
		parameters: {
			path: {
				id: {
					required: true,
					type: SwaggerDefinitionConstant.Parameter.Type.STRING,
				},
			},
			body: {
				model: 'VerifyPhone',
				required: true,
			},
		},
		responses: {
			400: {},
			404: {},
			202: {},
			204: {},
		},
	})
	@httpPatch('/:id/verify-phone')
	private async verifyPhone(
		@requestParam('id') id: string,
		@request() request: express.Request,
		@response() response: express.Response
	) {
		const adapterPort = new VerifyPhoneCustomerAdapter(response);

		this.verifyPhoneCustomerUseCase.setOutputPort(adapterPort);
		const command: IVerifyPhoneCustomerCommand = { ...request.body, id };

		await this.verifyPhoneCustomerUseCase.execute(
			`${new Date()}:${Math.random()}`,
			command
		);

		return adapterPort.response;
	}
}
