import { ValueObject } from '../../../shared/core/value-object';

export interface CustomerIdProps {
	id: string;
}
export class CustomerId extends ValueObject<CustomerIdProps> {
	public readonly id: string;

	private constructor(props: CustomerIdProps) {
		super(props);
		this.id = props.id;
	}

	public static create(props: CustomerIdProps): CustomerId {
		return new CustomerId(props);
	}
}
