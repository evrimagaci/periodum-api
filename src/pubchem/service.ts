import PubChemApi from './api';
import { PubChemCompound, RawCompound } from './types';
import getNecessaryData from './parseData';

class PubChemService {
	private api: PubChemApi;

	public constructor() {
		this.api = new PubChemApi();
	}

	async getCompoundById(id: number): Promise<PubChemCompound> {
		const response = await this.api.getCompoundById(id);
		const rawData = response.data as RawCompound;
		return getNecessaryData(rawData.Record);
	}

	getCompounds = async (from: number, to: number) => {
		const result = [];
		for (let id = from; id <= to; id++) {
			//TODO: Implement rate limiter
			const data = await this.getCompoundById(id);
			result.push(data);
		}
		return result;
	};
}

export default PubChemService;
