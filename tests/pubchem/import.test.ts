jest.mock('pubchem/index');
// import { RateLimiter } from 'limiter';
// import PubChemService from '../../src/pubchem/service';
// import { ParsedCompound } from '../../src/pubchem/types';

// const service = new PubChemService();
// const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 200 });

// const removeTokensMock = jest
// 	.spyOn(global, 'setTimeout')
// 	.mockImplementation(async () => {
// 		return count;
// 	});

describe('PubChem Import Script Specs', () => {
	it('should make 5 requests in 1 second', async () => {
		// // const mockFn = jest.fn();
		// // jest.spyOn;
		// // jest.useRealTimers();
		// jest.useFakeTimers();
		// // const spy = jest.spyOn(limiter, 'removeTokens');
		// // const spySetTimeout = jest.spyOn(global, 'setTimeout');
		// const tokens: Promise<number>[] = [];
		// // service.getCompounds(1, 20);
		// for (let id = 0; id < 6; id++) {
		// 	tokens.push(limiter.removeTokens(1));
		// }
		// Promise.all(tokens);
		// // await new Promise((resolve) => setTimeout(resolve, 1000));
		// jest.advanceTimersByTime(1000);
		// expect(tokens.filter((x) => typeof x === 'number').length).toBe(5);
		// // expect(spy).not.toBeCalled();
		// // expect(spy).toHaveBeenCalledTimes(5);
	});
});
