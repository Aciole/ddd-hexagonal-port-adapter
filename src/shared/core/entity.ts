import { ValueObject } from './value-object';

export abstract class Entity<TProps, ValueObject> {
	public readonly id?: ValueObject;
	private readonly props: TProps;

	constructor(props: TProps, id?: ValueObject) {
		this.props = props;
		this.id = id;
	}
}
