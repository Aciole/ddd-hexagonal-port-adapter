import { IOutputPort } from '../../../domain/interfaces/use-case/delete-customer';

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
