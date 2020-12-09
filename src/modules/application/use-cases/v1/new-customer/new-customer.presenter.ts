import { Customer } from '../../../../domain/customer';
import { INewCustomerOutputPort } from '../../../../domain/use-case/v1/new-customer';

export class NewCustomerPresenter implements INewCustomerOutputPort {
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
