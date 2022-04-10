import PubChemService from './service';
import CompoundService from '../services/compound.service';

import { parseIntMap } from './utils';
import { RawCompound } from './types';

const [from, to] = process.argv.slice(2).map(parseIntMap);

const notNumber = <T>(value: T | number): value is T => {
	return typeof value === 'number' ? false : true;
};

const validateRange = (from: number, to: number) => {
	if (from <= 0 || from > to) {
		throw new Error(
			'Invalid range. Start must be greater than 0 and less than `to`'
		);
	}
};

const maxRequestPerInterval = 5;
const requestInterval = 1000;
let start = 0;
let end = 0;
let timer: NodeJS.Timer;
const service = new CompoundService();
const pubChemService = new PubChemService();

export default async function init(from: number, to: number) {
	validateRange(from, to);

	start = from;
	end = to;

	timer = setInterval(async () => {
		const requests: Promise<RawCompound | number>[] = [];
		const endId = start + Math.min(end - start + 1, maxRequestPerInterval);

		for (let id = start; id < endId; id++) {
			//requesting raw data to prevent possible failed requests to parser script
			const request = pubChemService.getRawCompoundById(id);
			requests.push(request);
		}

		makeRequests(requests);

		start = endId;

		// All completed, stop the timer
		if (start >= end) {
			clearTimeout(timer);
		}
	}, requestInterval);
}

const makeRequests = async (requests: Promise<RawCompound | number>[]) => {
	//eslint-disable-next-line no-console
	console.log(requests); // intentional, to be remvoe later.
	// const compoundService = new CompoundService();
	const responses = await Promise.all(requests).then((results) => {
		return results.map((res) => {
			if (typeof res === 'number') {
				//TODO these ids may be pushed to an array and should remake a request to pubchem
				//eslint-disable-next-line no-console
				console.log('fail id', res);
				return res;
			} else {
				return pubChemService.parseData(res);
			}
		});
	});

	const compounds = responses.filter(notNumber);

	await service.createMany(compounds);
	// TODO: execute all promises at once like above
	// Import the data using compoundService
	// Error log case, (later we can create a table)
};

init(from, to);
