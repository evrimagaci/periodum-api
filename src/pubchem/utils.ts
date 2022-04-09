export const notEmpty = <T>(value: T | void): value is T => {
	return value ? true : false;
};

export const parseIntMap = (x: string) => parseInt(x);

export const validateRange = (from: number, to: number) => {
	if (from <= 0 || from > to) {
		throw new Error(
			'Invalid range. Start must be greater than 0 and less than `to`'
		);
	}
};
