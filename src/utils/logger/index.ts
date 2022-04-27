import { appsignal } from './appsignal';
import { PeriodumLogger } from './log.types';

const tracer = appsignal.tracer();

const log: PeriodumLogger = {
	error(err: Error | unknown): void {
		tracer.sendError(err as unknown as Error);
	}
};

export default log;
