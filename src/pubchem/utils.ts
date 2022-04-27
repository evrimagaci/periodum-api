import { PeriodumLogger } from '../utils/logger/log.types';

export const notEmpty = <T>(value: T | void): value is T => {
	return value ? true : false;
};

export const parseIntMap = (x: string) => parseInt(x);

export const log = {
	debug(...args: any[]) {
		if (process.env.NODE_ENV === 'development') {
			console.debug(args);
		}
	},

	error(...args: any[]) {
		if (process.env.NODE_ENV === 'production') {
			const error = new Error(args.join('\n'));
			import('../utils/logger').then((logger) => {
				(logger as unknown as PeriodumLogger).error(error);
			});
		}
	}
};
