import PubChemService from './service';
import CompoundService from '../services/compound.service';

import { parseIntMap, validateRange } from './utils';
import { ParsedCompound } from './types';

const [from, to] = process.argv.slice(2).map(parseIntMap);

const maxRequestPerInterval = 5;
const requestInterval = 1000;
let start = 0;
let end = 0;
let timer: NodeJS.Timer;
const service = new CompoundService();

export default async function init(from: number, to: number) {
	validateRange(from, to);

	start = from;
	end = to;

	const pubChemService = new PubChemService();

	timer = setInterval(async () => {
		const requests: Promise<ParsedCompound>[] = [];
		const endId = start + Math.min(end - start + 1, maxRequestPerInterval);

		for (let id = start; id < endId; id++) {
			const request = pubChemService.getParsedCompoundById(id);
			requests.push(request);
		}

		if (requests.length > 0) {
			makeRequests(requests);
		}

		start = endId;

		// All completed, stop the timer
		if (start >= end) {
			clearTimeout(timer);
		}
	}, requestInterval);
}

const makeRequests = async (requests: Promise<ParsedCompound>[]) => {
	console.log(requests); // intentional, to be remvoe later.
	// const compoundService = new CompoundService();
	const compounds = await Promise.all(requests);
	service.createMany(compounds);
	// TODO: execute all promises at once like above
	// Import the data using compoundService
	// Error log case, (later we can create a table)
};

init(from, to);
