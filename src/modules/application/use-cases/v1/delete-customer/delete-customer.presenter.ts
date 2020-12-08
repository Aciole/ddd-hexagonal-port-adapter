import { IOutputPort } from '../../../../domain/use-case/v1/delete-customer/delete-customer.usecase';

export class DeleteCustomerPresenter implements IOutputPort {
	public notFoundOutputPort: boolean = false;
	public deletedOutputPort: boolean = false;

	notFound(): void {
		this.notFoundOutputPort = true;
	}
	deleted(): void {
		this.deletedOutputPort = true;
	}
}
