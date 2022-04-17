export default class Limiter {
	private requestInterval: number;
	private interval!: NodeJS.Timer;
	private callbackToLimit!: () => void;

	constructor(requestInterval: number) {
		this.requestInterval = requestInterval;
	}

	public async limit(fn: () => void) {
		this.callbackToLimit = fn;
		this.interval = setInterval(this.callbackToLimit, this.requestInterval);
	}

	public stop() {
		clearInterval(this.interval);
	}

	changeInterval(requestInterval: number) {
		if (this.requestInterval !== requestInterval) {
			console.log('Changing interval to', requestInterval);
			this.requestInterval = requestInterval;
			this.stop();
			this.limit(this.callbackToLimit);
		}
	}
}
