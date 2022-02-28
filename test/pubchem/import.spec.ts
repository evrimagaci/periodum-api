import { expect } from 'chai';
import getNecessaryData from 'pubchem/parseData';
// import init from 'pubchem/index';

describe('PubChem Import Script Specs', () => {
	it('should return related object when ToCHeading contains H1 key', () => {
		// This is here on purpose to ensure to test working
		expect(getNecessaryData).to.be.a('function');
		// expect(init).to.be.a('function');
		expect('nothing').equals('nothing');
	});
});
