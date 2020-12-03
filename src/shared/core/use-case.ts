export interface IUseCase<IRequest, IOutputPort> {
	setOutputPort(outputPort: IOutputPort): void;
	execute(transactionId: string, request: IRequest): Promise<void>;
}
