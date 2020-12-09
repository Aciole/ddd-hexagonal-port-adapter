import { Customer } from '../../../../domain/customer';
import { IVerifyEmailCustomerOutputPort } from '../../../../domain/use-case/v1/verify-email';

export class VerifyEmailCustomerPresenter
	implements IVerifyEmailCustomerOutputPort {
	public invalidOutputPort: boolean = false;
	public notFoundOutputPort: boolean = false;
	public alreadyBeenVerifiedOutputPort: boolean = false;
	public verifiedOutputPort: boolean = false;
	public doesNotBelongToThisCustomerPort: boolean = false;

	invalid(error: Error): void {
		this.invalidOutputPort = true;
	}
	notFound(error: Error): void {
		this.notFoundOutputPort = true;
	}

	doesNotBelongToThisCustomer(error: Error): void {
		this.doesNotBelongToThisCustomerPort = true;
	}

	alreadyBeenVerified(error: Error): void {
		this.alreadyBeenVerifiedOutputPort = true;
	}

	verified(customer: Customer): void {
		this.verifiedOutputPort = true;
	}
}
