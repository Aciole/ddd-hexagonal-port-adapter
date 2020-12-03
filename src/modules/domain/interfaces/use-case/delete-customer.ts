import { IUseCase } from '@shared/core/use-case';

export interface IDeleteCustomerCommand {
	id: string;
}

export interface IOutputPort {
	notFound(): void;
	deleted(): void;
}

export interface IDeleteCustomerUseCase
	extends IUseCase<IDeleteCustomerCommand, IOutputPort> {}
