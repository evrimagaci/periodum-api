import PubChemApi from './api';
import { RawCompound, ParsedCompound } from './types';
import getNecessaryData from './parseData';

class PubChemService {
	private api: PubChemApi;

	public constructor() {
		this.api = new PubChemApi();
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
}

export default PubChemService;
