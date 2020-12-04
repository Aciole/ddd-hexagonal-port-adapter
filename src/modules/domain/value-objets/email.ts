import { ValueObject } from '../../../shared/core/value-object';
import { Result } from '../../../shared/core/result';

interface IEmailProps {
	value: string;
	verified: boolean;
	verifiedDate?: Date;
}

export class Email extends ValueObject<IEmailProps> {
	public readonly value: string;
	public readonly verified: boolean;
	public readonly verifiedDate?: Date;
	private constructor(props: IEmailProps) {
		super(props);
		this.value = props.value;
		this.verified = props.verified;
		this.verifiedDate = props.verifiedDate;
	}

	private static isValidEmail(email: string) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	private static format(email: string): string {
		return email.trim().toLowerCase();
	}

	public static create(
		email: string,
		verified: boolean,
		verifiedDate?: Date
	): Result<Email> {
		if (!this.isValidEmail(email)) {
			return Result.fail<Email>('Email address not valid');
		} else {
			return Result.ok<Email>(
				new Email({ value: this.format(email), verified, verifiedDate })
			);
		}
	}
}
