export const Loggable = () => {
	return (target: Function) => {
		for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
			const descriptor = Object.getOwnPropertyDescriptor(
				target.prototype,
				propertyName
			);

			if (!descriptor) {
				continue;
			}

			const originalMethod = descriptor.value;

			const isMethod = originalMethod instanceof Function;

			if (!isMethod) {
				continue;
			}

			descriptor.value = function (...args: any[]) {
				console.log(`[${target.name}][${propertyName}] Entering`);

				const now = Date.now();
				const result = originalMethod.apply(this, args);

				const exitLog = () => {
					console.log(
						`[${target.name}][${propertyName}] Exiting ${Date.now() - now}ms`
					);
				};

				if (typeof result === 'object' && typeof result.then === 'function') {
					const promise = result.then(exitLog);

					if (typeof promise.catch === 'function') {
						promise.catch((e: any) => e);
					}
				} else {
					exitLog();
				}

				return result;
			};

			Object.defineProperty(target.prototype, propertyName, descriptor);
		}
	};
};

export const LogTransaction = (
	target: Object,
	propertyName: string,
	propertyDesciptor: PropertyDescriptor
): PropertyDescriptor => {
	const method = propertyDesciptor.value;

	propertyDesciptor.value = function (...args: any[]) {
		const params = args.map((a) => JSON.stringify(a));

		const result = method.apply(this, args);

		console.log(
			`[${propertyName}]
			`,
			{
				timestamp: new Date(),
				transactionId: params[0],
				request: params[1],
			}
		);

		return result;
	};
	return propertyDesciptor;
};
