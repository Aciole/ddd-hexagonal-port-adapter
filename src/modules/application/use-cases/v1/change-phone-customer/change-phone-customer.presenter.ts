import { Customer } from '../../../../domain/customer';
import { IOutputPort } from '../../../../domain/use-case/v1/change-phone/change-phone-customer.usecase';

export class ChangePhoneCustomerPresenter implements IOutputPort {
	public invalidOutputPort: boolean = false;
	public notFoundOutputPort: boolean = false;
	public unchangedOutputPort: boolean = false;
	public changedOutputPort: boolean = false;

	invalid(error: Error): void {
		this.invalidOutputPort = true;
	}
	notFound(error: Error): void {
		this.notFoundOutputPort = true;
	}
	unchanged(error: Error): void {
		this.unchangedOutputPort = true;
	}
	changed(customer: Customer): void {
		this.changedOutputPort = true;
	}
}
