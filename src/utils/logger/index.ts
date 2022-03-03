import { appsignal } from './appsignal';

const tracer = appsignal.tracer();

const log = {
	error(err: Error | unknown) {
		tracer.sendError(err as unknown as Error);
	}
};

export default log;
