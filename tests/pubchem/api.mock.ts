import { AxiosResponse } from 'axios';
import { readFileSync } from 'fs';
import path from 'path';

export const getCompoundById = (url: string): AxiosResponse => {
	const splitted = url.split('/');
	const id = parseInt(splitted[splitted.length - 2]);

	return {
		...getCompound(id),
		headers: {
			'x-throttling-control':
				'Request Count status: Green (0%), Request Time status: Green (0%), Service status: Green (0%)'
		}
	};
};

export const getCompoundByIdWithThrottle = (url: string): AxiosResponse => {
	const splitted = url.split('/');
	const id = parseInt(splitted[splitted.length - 2]);
	// console.log('\n->Throttling for', id, '\n');

	return {
		...getCompound(id),
		headers: {
			'x-throttling-control':
				'Request Count status: Green (90%), Request Time status: Green (90%), Service status: Green (90%)'
		}
	};
};

function getCompound(id: number) {
	const filePath = path.resolve(`tests/pubchem/fixtures/${id}.json`);
	const data = readFileSync(filePath, 'utf8');
	return {
		data: JSON.parse(data)
	} as AxiosResponse;
}
