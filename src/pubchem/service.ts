import PubChemApi from './api';
import { PubChemCompound, RawCompound } from './types';
import getNecessaryData from './parseData';
import { RateLimiter } from 'limiter';

class PubChemService {
	private api: PubChemApi;
	private limiter: RateLimiter;

	public constructor() {
		this.api = new PubChemApi();
		this.limiter = new RateLimiter({ tokensPerInterval: 1, interval: 250 });
	}

	async getCompoundById(id: number): Promise<PubChemCompound> {
		const response = await this.api.getCompoundById(id);
		const rawData = response.data as RawCompound;
		return getNecessaryData(rawData.Record);
	}

	async throttleRequest(id: number) {
		await this.limiter.removeTokens(1);

		if (id === undefined) {
			return;
		}
		return this.getCompoundById(id)
			.then((res) => {
				return res;
			})
			.catch((e) => {
				//eslint-disable-next-line
				console.error(e);
			});
	}

	getCompounds = async (from: number, to: number) => {
		const result: PubChemCompound[] = [];
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
