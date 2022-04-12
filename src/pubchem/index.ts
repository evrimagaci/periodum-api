import PubChemService from './service';
import CompoundService from '../services/compound.service';

import { parseIntMap } from './utils';
import { ParsedCompound, RawCompound } from './types';

import Limiter from './limiter';
const [from, to] = process.argv.slice(2).map(parseIntMap);

/**
 * Splits given array by type number or ParsedCompound
 * @param array
 * @returns {compounds: ParsedCompound[], numbers: number[]}
 */
const splitArrayByType = (array: (number | ParsedCompound)[]) => {
	const numbers: number[] = [],
		compounds: ParsedCompound[] = [];

	array.forEach((item) => {
		if (typeof item === 'number') {
			numbers.push(item);
		} else {
			compounds.push(item);
		}
	});
	return { numbers, compounds };
};

const validateRange = (from: number, to: number) => {
	if (from <= 0 || from > to) {
		throw new Error(
			'Invalid range. Start must be greater than 0 and less than `to`'
		);
	}
};

const maxRequestPerInterval = 5;
//Lower requestInterval to something like 500 ms to test fail cases. Don't lower it too much to avoid ban from Pubhem
const requestInterval = 500;

let successCount = 0;
let ids: number[];
let fails: number[] = [];

const service = new CompoundService();
const pubChemService = new PubChemService();
const limiter = new Limiter(requestInterval);

const checkForFails = () => {
	if (fails.length) {
		console.log('These ids were failed to fetch', fails);
		console.log('Retrying...');
		ids = [...fails];
		fails = [];
		successCount = 0;

		return true;
	}
	console.timeEnd('PubChem');
	return false;
};

const updateSuccessCount = (val: number) => {
	successCount += val;
	if (successCount + fails.length === ids.length) {
		console.log('All requests are resolved!');
		checkForFails() ? throttle() : console.log('No fails');
	}
};

export default async function init(from: number, to: number) {
	console.time('PubChem');
	validateRange(from, to);
	ids = new Array(to - from + 1).fill(0).map((_, i) => i + from);
	throttle();
}

const throttle = () => {
	const idsToRequest = [...ids];
	limiter.limit(async () => {
		const requests = idsToRequest
			.splice(0, maxRequestPerInterval)
			.map((id) => pubChemService.getRawCompoundById(id));

		if (idsToRequest.length === 0) {
			limiter.stop();
		}

		makeRequests(requests);
	});
};

const makeRequests = async (requests: Promise<RawCompound | number>[]) => {
	//eslint-disable-next-line no-console
	const responses = await Promise.all(requests).then((results) => {
		return results.map((res) => {
			if (typeof res === 'number') {
				//TODO these ids may be pushed to an array and should remake a request to pubchem
				//eslint-disable-next-line no-console
				console.log('😫FAILED Compound ID:', res);
				return res;
			} else {
				const compound = pubChemService.parseData(res);
				console.log('Completed compound id: ', compound.id);
				return compound;
			}
		});
	});

	const { compounds, numbers } = splitArrayByType(responses);
	if (numbers.length) {
		console.log('Fails', numbers);
	}
	fails = [...fails, ...numbers];
	updateSuccessCount(compounds.length);
	await service.createMany(compounds);
	// TODO: execute all promises at once like above
	// Import the data using compoundService
	// Error log case, (later we can create a table)
};

// const retry = async () => {};

init(from, to);
