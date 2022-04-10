export const notEmpty = <T>(value: T | void): value is T => {
	return value ? true : false;
};

export const parseIntMap = (x: string) => parseInt(x);
