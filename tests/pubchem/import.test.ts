import init from '../../src/pubchem/index';

describe('PubChem Import Script Specs', () => {
	it("should throw error if 'from' is greater than 'to'", () => {
		expect(() => init(10, 5)).rejects.toThrow();
	});
});
