import { Customer } from '../../../../domain/customer';
import { IOutputPort } from '../../../../domain/use-case/v1/new-customer/new-customer.usecase';

export class NewCustomerPresenter implements IOutputPort {
	public invalidOutputPort: boolean = false;
	public duplicateOutputPort: boolean = false;
	public createdOutputPort: boolean = false;

	invalid(err: Error): void {
		this.invalidOutputPort = true;
	}
	duplicate(err: Error): void {
		this.duplicateOutputPort = true;
	}
	created(customer: Customer): void {
		this.createdOutputPort = true;
	}
}
