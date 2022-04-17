import { AxiosResponse } from 'axios';
import { readFileSync } from 'fs';
import path from 'path';

export const getCompoundById = (url: string): AxiosResponse => {
	const splitted = url.split('/');
	const id = parseInt(splitted[splitted.length - 2]);

	return getCompound(id);
};

function getCompound(id: number) {
	const filePath = path.resolve(`tests/pubchem/fixtures/${id}.json`);
	const data = readFileSync(filePath, 'utf8');
	return { data: JSON.parse(data), headers: {} } as AxiosResponse;
}
