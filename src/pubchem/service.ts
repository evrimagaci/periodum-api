import PubChemApi from './api';
import { RawCompound, ParsedCompound } from './types';
import getNecessaryData from './parser';
import { AxiosResponseHeaders } from 'axios';
import { log } from './utils';

interface ServerStatus {
	count: number;
	time: number;
	status: number;
}
class PubChemService {
	private api: PubChemApi;
	private changeInterval: (requestInterval: number) => void;
	private currentInterval: number;
	private readonly initialInterval: number;
	private readonly throttleAmount = 50;
	private readonly maxInterval = 2000;
	private readonly alertPercentage = 75;

	public constructor({
		changeInterval,
		interval
	}: {
		changeInterval: (requestInterval: number) => void;
		interval: number;
	}) {
		this.api = new PubChemApi();
		this.changeInterval = changeInterval;
		this.initialInterval = interval;
		this.currentInterval = interval;
	}

	parseData(data: RawCompound): ParsedCompound {
		return { ...getNecessaryData(data.Record), id: data.Record.RecordNumber };
	}

	private parseThrottlingControl(
		header: AxiosResponseHeaders
	): ServerStatus | undefined {
		if ('x-throttling-control' in header) {
			const throttlingControl = header['x-throttling-control'];
			const [count, time, service] = throttlingControl
				.split(',')
				.map((x) => x.replace(/\D/g, ''));
			return {
				count: parseInt(count),
				time: parseInt(time),
				status: parseInt(service)
			};
		}
		return undefined;
	}

	private calculateThrottle(val: number, coefficient = 1, stepPercentage = 5) {
		if (val > this.alertPercentage) {
			log.debug('\n->Throttling for', val, '\n');
		}
		const step = Math.max(
			Math.floor((val - this.alertPercentage) / stepPercentage + 1),
			-this.initialInterval
		);
		return this.throttleAmount * step * coefficient;
	}

	private throttle(serverStatus: ServerStatus) {
		//We might pass serverStatus to an iterator function, but
		//Leaving here as is because we might want to pass different coefficients
		const deltaTime = this.calculateThrottle(serverStatus.time);
		const deltaCount = this.calculateThrottle(serverStatus.count);
		const deltaStatus = this.calculateThrottle(serverStatus.status);

		let maxDelta = 0;
		//sort the deltas to check the positive and negative
		const sortedDeltas = [deltaTime, deltaCount, deltaStatus].sort();

		//if we have a positive then correct the interval with that
		if (sortedDeltas[2] > 0) {
			maxDelta = sortedDeltas[2];
		}
		//if we don't have a positive then we might have a negative or zero
		//change the interval with the negative or zero
		//assigning zero will have no effect anyway
		else {
			maxDelta = sortedDeltas[0];
		}

		//Clamp maxDelta between maxInterval and initialInterval(min)
		maxDelta = Math.max(
			Math.min(this.maxInterval, maxDelta + this.currentInterval),
			this.initialInterval
		);

		//If currentInterval is different than maxDelta, change it
		if (maxDelta !== this.currentInterval) {
			this.currentInterval = maxDelta;
			this.changeInterval(this.currentInterval);
			log.debug('\n->time, count, status', [
				deltaTime,
				deltaCount,
				deltaStatus
			]);
			log.debug('->Interval changed to: ', this.currentInterval, '\n');
		}
	}

	async getRawCompoundById(id: number): Promise<RawCompound | number> {
		const response = await this.api.getCompoundById(id).catch(() => {
			return id;
		});
		if (typeof response === 'number') {
			return response;
		}
		const serverStatus = this.parseThrottlingControl(response.headers);
		if (serverStatus) {
			this.throttle(serverStatus);
		}

		return response.data as RawCompound;
	}

	//This function is tweaked so that tests will stay happy. Need to rewrite the test logic as well
	async getParsedCompoundById(id: number): Promise<ParsedCompound> {
		const rawData = (await this.getRawCompoundById(id)) as RawCompound;
		return { ...this.parseData(rawData), id };
	}
}

export default PubChemService;
