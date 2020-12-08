import { Customer } from '../../../../../../modules/domain/customer';
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
	description: 'Customer description',
	name: 'CustomerRegister',
})
export class CustomerRegisterViewModel {
	@ApiModelProperty({
		description: '',
	})
	public firstname!: string;

	@ApiModelProperty({
		description: '',
	})
	public lastname!: string;

	@ApiModelProperty({
		description: '',
	})
	public email!: string;

	@ApiModelProperty({
		description: '',
	})
	public hasEmailVerified!: boolean;

	@ApiModelProperty({
		description: 'Phone number',
	})
	public phone!: string;

	@ApiModelProperty({
		description: '',
	})
	public hasPhoneVerified!: boolean;
}

@ApiModel({
	description: 'Change Name Request',
	name: 'ChangeName',
})
export class ChangeNameViewModel {
	@ApiModelProperty({
		description: '',
	})
	public firstname!: string;

	@ApiModelProperty({
		description: '',
	})
	public lastname!: string;
}

@ApiModel({
	description: 'Change Email Request',
	name: 'ChangeEmail',
})
export class ChangeEmailViewModel {
	@ApiModelProperty({
		description: '',
	})
	public email!: string;
}

@ApiModel({
	description: 'Verify Email Request',
	name: 'VerifyEmail',
})
export class VerifyEmailViewModel {
	@ApiModelProperty({
		description: '',
	})
	public email!: string;
}

@ApiModel({
	description: 'Change Phone Request',
	name: 'ChangePhone',
})
export class ChangePhoneViewModel {
	@ApiModelProperty({
		description: '',
	})
	public phone!: string;
}

@ApiModel({
	description: 'Verify Phone Request',
	name: 'VerifyPhone',
})
export class VerifyPhoneViewModel {
	@ApiModelProperty({
		description: '',
	})
	public phone!: string;
}

@ApiModel({
	description: 'Customer description',
	name: 'Customer',
})
export class CustomerViewModel {
	constructor(domain: Customer) {
		this.id = domain.id?.id;
		this.firstname = domain.name.firstname;
		this.lastname = domain.name.lastname;
		this.email = domain.email.value;
		this.hasEmailVerified = domain.email.verified;
		this.phone = domain.phone.value;
		this.hasPhoneVerified = domain.phone.verified;
	}

	@ApiModelProperty({
		description: '',
	})
	id?: string;

	@ApiModelProperty({
		description: '',
	})
	firstname: string;

	@ApiModelProperty({
		description: '',
	})
	lastname: string;

	@ApiModelProperty({
		description: '',
	})
	email: string;

	@ApiModelProperty({
		description: '',
	})
	hasEmailVerified: boolean;

	@ApiModelProperty({
		description: 'Phone number',
	})
	phone: string;

	@ApiModelProperty({
		description: '',
	})
	hasPhoneVerified: boolean;
}
