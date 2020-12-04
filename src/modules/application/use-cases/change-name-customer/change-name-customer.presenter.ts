import { Customer } from '../../../domain/customer';
import { IOutputPort } from '../../../domain/interfaces/use-case/change-name-customer';

export class ChangeNameCustomerPresenter implements IOutputPort {
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
