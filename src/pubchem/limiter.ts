export default class Limiter {
	private requestInterval: number;
	private interval!: NodeJS.Timer;

	constructor(requestInterval: number) {
		this.requestInterval = requestInterval;
	}

	public async limit(fn: () => void) {
		this.interval = setInterval(fn, this.requestInterval);
	}

	public stop() {
		clearInterval(this.interval);
	}
}
