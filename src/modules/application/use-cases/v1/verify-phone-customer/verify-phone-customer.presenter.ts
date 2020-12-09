import { Customer } from '../../../../domain/customer';
import { IVerifyPhoneCustomerOutputPort } from '../../../../domain/use-case/v1/verify-phone';

export class VerifyPhoneCustomerPresenter
	implements IVerifyPhoneCustomerOutputPort {
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
