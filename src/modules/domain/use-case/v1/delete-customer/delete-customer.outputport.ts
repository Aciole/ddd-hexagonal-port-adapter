export interface IDeleteCustomerOutputPort {
	notFound(): void;
	deleted(): void;
}
