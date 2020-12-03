export abstract class ValueObject<TProps> {
	private readonly props: TProps;
	constructor(props: TProps) {
		this.props = props;
	}
}
