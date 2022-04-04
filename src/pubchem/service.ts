import PubChemApi from './api';
import { RawCompound, ParsedCompound } from './types';
import getNecessaryData from './parseData';
import { RateLimiter } from 'limiter';

class PubChemService {
	private api: PubChemApi;
	private limiter: RateLimiter;

	public constructor() {
		this.api = new PubChemApi();
		this.limiter = new RateLimiter({ tokensPerInterval: 5, interval: 1000 });
	}

	parseData(data: RawCompound): ParsedCompound {
		return getNecessaryData(data.Record);
	}

	async getRawCompoundById(id: number): Promise<RawCompound> {
		const response = await this.api.getCompoundById(id);
		return response.data as RawCompound;
	}

	async getParsedCompoundById(id: number): Promise<ParsedCompound> {
		const rawData = await this.getRawCompoundById(id);
		return { ...this.parseData(rawData), id };
	}

	async throttleRequest(id: number) {
		if (id === undefined) {
			return;
		}

		return this.getParsedCompoundById(id)
			.then((res) => {
				//eslint-disable-next-line
				// console.log(res.RecordTitle);
				return res;
			})
			.catch((e) => {
				//eslint-disable-next-line
				console.error(e);
			});
	}

	getCompounds = async (from: number, to: number) => {
		const result: Promise<void | ParsedCompound>[] = [];
		for (let id = from; id <= to; id++) {
			await this.limiter.removeTokens(1);

			result.push(this.throttleRequest(id));
		}

		return Promise.all(result);
	};
}

export default PubChemService;
