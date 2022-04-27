import Limiter from '../../src/pubchem/limiter';

describe('Limiter Tests', () => {
	// To surpass logs when testing
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	jest.spyOn(console, 'log').mockImplementation(() => {});

	it('should call the callback with inteval time', () => {
		const interval = 1000;
		const limiter = new Limiter(interval);

		jest.useFakeTimers();

		const callback = jest.fn();
		limiter.limit(callback);

		jest.advanceTimersByTime(interval);
		expect(callback).toBeCalled();
	});

	it('should call the callback n number of times in 10 seconds', () => {
		const interval = 1000;
		const totalTime = 10 * 1000;
		const limiter = new Limiter(interval);

		jest.useFakeTimers();

		const callback = jest.fn();
		limiter.limit(callback);

		jest.advanceTimersByTime(totalTime);
		expect(callback).toBeCalledTimes(totalTime / interval);
	});

	it('should update the interval when called Limiter.changeInterval', () => {
		const interval = 1000;
		const limiter = new Limiter(interval);

		jest.useFakeTimers();

		const callback = jest.fn();

		limiter.limit(callback);
		jest.advanceTimersByTime(interval);
		expect(callback).toBeCalledTimes(1);

		callback.mockClear();

		limiter.changeInterval(interval * 2);
		jest.advanceTimersByTime(interval * 2);
		expect(callback).toBeCalledTimes(1);
	});
});
