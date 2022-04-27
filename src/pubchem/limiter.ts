import { log } from './utils';

export default class Limiter {
	private requestInterval: number;
	private interval!: NodeJS.Timer;
	private callback!: () => void;

	constructor(requestInterval: number) {
		this.requestInterval = requestInterval;
	}

	public async limit(fn: () => void) {
		this.callback = fn;
		this.interval = setInterval(this.callback, this.requestInterval);
	}

	public stop() {
		clearInterval(this.interval);
	}

	changeInterval(requestInterval: number) {
		if (this.requestInterval !== requestInterval) {
			log.debug('Changing interval to', requestInterval);
			this.requestInterval = requestInterval;
			this.stop();
			this.limit(this.callback);
		}
	}
}
