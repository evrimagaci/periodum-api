import * as mockedAPI from './api.mock';
import PubChemService from '../../src/pubchem/service';

jest.mock('axios', () => {
	return {
		__esModule: true,
		default: {
			get: mockedAPI.getCompoundById
		}
	};
});

describe('PubChem API Tests', () => {
	it('should parse RawCompund properly', async () => {
		const service = new PubChemService();
		const data = await service.getCompoundById(222);
		expect(data.RecordTitle).toEqual('Ammonia');
		expect(Array.isArray(data.ChemicalSafety)).toBe(true);
		// FIX: Validate the data
		// expect(data.Section[0].TOCHeading).toEqual('Chemical Safety');
		// expect(
		// 	data.Section[1].Information[0].Value.StringWithMarkup[0].Markup[0].Extra
		// ).toEqual('Corrosive');
	});
});
