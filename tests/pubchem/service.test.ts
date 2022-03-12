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
		expect(data).toBeTruthy();
	});
});
