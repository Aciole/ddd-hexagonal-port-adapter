import { ValueObject } from '@core/value-object';
import { Result } from '@shared/core/result';

interface IPhoneProps {
	value: string;
	verified: boolean;
	verifiedDate?: Date;
}

export class Phone extends ValueObject<IPhoneProps> {
	public readonly value: string;
	public readonly verified: boolean;
	public readonly verifiedDate?: Date;

	private constructor(props: IPhoneProps) {
		super(props);
		this.value = props.value;
		this.verified = props.verified;
		this.verifiedDate = props.verifiedDate;
	}

	private static isValidPhone(phone: string) {
		var re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
		return re.test(phone);
	}

	public static create(
		value: string,
		verified: boolean,
		verifiedDate?: Date
	): Result<Phone> {
		if (!this.isValidPhone(value)) {
			return Result.fail<Phone>('Phone not valid');
		} else {
			return Result.ok<Phone>(new Phone({ value, verified, verifiedDate }));
		}
	}
}
