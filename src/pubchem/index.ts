import PubChemService from './service';
// import CompoundService from '../services/compound.service';

import { parseIntMap, validateRange } from './utils';
import { RawCompound } from './types';

const [from, to] = process.argv.slice(2).map(parseIntMap);

const maxRequestPerInterval = 5;
const requestInterval = 1000;
let start = 0;
let end = 0;
let timer: NodeJS.Timer;

export default async function init(from: number, to: number) {
	validateRange(from, to);

	start = from;
	end = to;

	const pubChemService = new PubChemService();

	timer = setInterval(async () => {
		const requests: Promise<RawCompound>[] = [];
		const endId = start + maxRequestPerInterval;
		for (let id = start; id <= endId; id++) {
			const request = pubChemService.getRawCompoundById(id);
			requests.push(request);
		}
		if (requests.length >= maxRequestPerInterval) {
			makeRequests(requests);
		}
		start = endId;
		// All completed, stop the timer
		if (start === end) {
			clearTimeout(timer);
		}
	}, requestInterval);
}

const makeRequests = async (requests: Promise<RawCompound>[]) => {
	console.log(requests); // intentional, to be remvoe later.
	// const compoundService = new CompoundService();
	//await Promise.all(requests);
	// TODO: execute all promises at once like above
	// Import the data using compoundService
	// Error log case, (later we can create a table)
};

init(from, to);
