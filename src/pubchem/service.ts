import PubChemApi from './api';
import { RawCompound, ParsedCompound } from './types';
import getNecessaryData from './parseData';
import { RateLimiter } from 'limiter';

class PubChemService {
	private api: PubChemApi;
	private limiter: RateLimiter;

	public constructor() {
		this.api = new PubChemApi();
		this.limiter = new RateLimiter({ tokensPerInterval: 1, interval: 250 });
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
		return this.parseData(rawData);
	}

	async throttleRequest(id: number) {
		await this.limiter.removeTokens(1);

		if (id === undefined) {
			return;
		}
		return this.getParsedCompoundById(id)
			.then((res) => {
				return res;
			})
			.catch((e) => {
				//eslint-disable-next-line
				console.error(e);
			});
	}

	getCompounds = async (from: number, to: number) => {
		const result: ParsedCompound[] = [];
		for (let id = from; id <= to; id++) {
			await this.throttleRequest(id).then((e) => {
				if (e) {
					//eslint-disable-next-line
					console.log('title', e?.RecordTitle);
					result.push(e);
				}
			});
		}
		return result;
	};
}

export default PubChemService;
