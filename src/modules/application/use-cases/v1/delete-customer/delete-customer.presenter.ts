import { IDeleteCustomerOutputPort } from '../../../../domain/use-case/v1/delete-customer';

export class DeleteCustomerPresenter implements IDeleteCustomerOutputPort {
	public notFoundOutputPort: boolean = false;
	public deletedOutputPort: boolean = false;

	notFound(): void {
		this.notFoundOutputPort = true;
	}
	deleted(): void {
		this.deletedOutputPort = true;
	}
}
