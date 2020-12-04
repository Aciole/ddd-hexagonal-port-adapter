import { ValueObject } from '../../../shared/core/value-object';
import { Result } from '../../../shared/core/result';

interface INameProps {
	firstname: string;
	lastname: string;
}

export class Name extends ValueObject<INameProps> {
	public readonly fullname: string;
	public readonly firstname: string;
	public readonly lastname: string;

	private static readonly MIN_LENGTH: number = 3;
	private static readonly MAX_LENGTH: number = 30;

	private constructor(props: INameProps) {
		super(props);
		this.fullname = `${props.firstname} ${props.lastname}`;
		this.firstname = props.firstname;
		this.lastname = props.lastname;
	}

	private static isValid(str: string, min: number, max: number): boolean {
		return str.length > min && str.length < max;
	}

	public static create(firstname: string, lastname: string): Result<Name> {
		if (
			this.isValid(firstname, this.MIN_LENGTH, this.MAX_LENGTH) == false ||
			this.isValid(lastname, this.MIN_LENGTH, this.MAX_LENGTH) == false
		) {
			return Result.fail<Name>(
				`firstname or lastname not valid! min-length:${3}, max-length:${30}`
			);
		} else {
			return Result.ok<Name>(
				new Name({ firstname: firstname, lastname: lastname })
			);
		}
	}
}
